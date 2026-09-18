package repositories

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"uuid"

	"github.com/ViitoJooj/noxacloud/internal/containers/server/entities"
	"github.com/ViitoJooj/noxacloud/pkg/logs"
	"github.com/ViitoJooj/noxacloud/pkg/utils"
)

type ServerRepository struct {
	DB *sql.DB
}

func NewServerRepository(pgdb *sql.DB) ServerRepository {
	return ServerRepository{
		DB: pgdb,
	}
}

const (
	proxy    = "Proxy"
	database = "Database"
	cache    = "Cache"
	email    = "Emails"
)

func (r *ServerRepository) Save(ctx context.Context, input entities.ServerInfo) (entities.ServerInfo, error) {
	const query = `
		INSERT INTO server_data (info_name, working, uptime, updated_at)
		VALUES ($1, $2, $3, NOW())
		ON CONFLICT (info_name)
		DO UPDATE SET
			working = EXCLUDED.working,
			uptime = EXCLUDED.uptime,
			updated_at = EXCLUDED.updated_at;
	`

	services := []struct {
		name    string
		working bool
		uptime  time.Time
	}{
		{name: proxy, working: input.ServicesInfo.Proxy.Working, uptime: input.ServicesInfo.Proxy.UpTime},
		{name: database, working: input.ServicesInfo.Database.Working, uptime: input.ServicesInfo.Database.UpTime},
		{name: cache, working: input.ServicesInfo.Cache.Working, uptime: input.ServicesInfo.Cache.UpTime},
		{name: email, working: input.ServicesInfo.Emails.Working, uptime: input.ServicesInfo.Emails.UpTime},
	}

	for _, s := range services {
		_, err := r.DB.ExecContext(ctx, query, s.name, s.working, s.uptime)
		if err != nil {
			return entities.ServerInfo{}, fmt.Errorf("falha ao salvar %s: %w", s.name, err)
		}
	}

	err := utils.SaveIsertionMetadata(ctx, r.DB, "insert.server_data", nil, "SUCCESS", nil)
	if err != nil {
		logs.Error(ctx, err.Error())
		utils.SaveIsertionMetadata(ctx, r.DB, "insert.action_confirm", nil, "FAILED", err)
	}

	return input, nil
}

func (r *ServerRepository) List(ctx context.Context) ([]entities.ServerInfo, error) {
	const query = `SELECT info_name, working, uptime FROM server_data;`

	rows, err := r.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var output entities.ServerInfo

	for rows.Next() {
		var (
			name    string
			working bool
			uptime  time.Time
		)

		if err := rows.Scan(&name, &working, &uptime); err != nil {
			return nil, err
		}

		switch name {
		case proxy:
			output.ServicesInfo.Proxy = entities.Proxy{Working: working, UpTime: uptime}
		case database:
			output.ServicesInfo.Database = entities.Database{Working: working, UpTime: uptime}
		case cache:
			output.ServicesInfo.Cache = entities.Cache{Working: working, UpTime: uptime}
		case email:
			output.ServicesInfo.Emails = entities.Emails{Working: working, UpTime: uptime}
		}
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return []entities.ServerInfo{output}, nil
}

func (r *ServerRepository) GetByID(ctx context.Context, id *uuid.UUID) (entities.ServerInfo, error) {
	return entities.ServerInfo{}, errors.New("server_data is a fixed table: only Save and List are supported")
}

func (r *ServerRepository) Exists(ctx context.Context, input entities.ServerInfo) (bool, error) {
	return false, errors.New("server_data is a fixed table: only Save and List are supported")
}

func (r *ServerRepository) Update(ctx context.Context, id *uuid.UUID, input entities.ServerInfo) (entities.ServerInfo, error) {
	return entities.ServerInfo{}, errors.New("server_data is a fixed table: only Save and List are supported")
}

func (r *ServerRepository) Delete(ctx context.Context, id *uuid.UUID) error {
	return errors.New("server_data is a fixed table: only Save and List are supported")
}
