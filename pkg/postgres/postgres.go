package postgres

import (
	"context"
	"database/sql"

	"github.com/ViitoJooj/noxacloud/pkg/dotenv"
)

func NewPostgresConn(ctx context.Context, cfg dotenv.PostgreSQL) (*sql.DB, error) {

	pgdb, err := sql.Open("postgres", cfg.Uri)
	if err != nil {
		return nil, err
	}

	return pgdb, nil
}
