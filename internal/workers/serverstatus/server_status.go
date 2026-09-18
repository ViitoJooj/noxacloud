package serverstatus

import (
	"context"
	"database/sql"
	"net/http"
	"time"

	"github.com/ViitoJooj/noxacloud/internal/contracts"
	"github.com/redis/go-redis/v9"
)

type Reporter struct {
	db   *sql.DB
	rdb  *redis.Client
	opts contracts.WorkerOptions
}

func NewReporter(db *sql.DB, rdb *redis.Client, opts ...contracts.WorkerOption) *Reporter {
	return &Reporter{db: db, rdb: rdb, opts: contracts.NewWorkerOptions(5*time.Minute, opts...)}
}

func (w *Reporter) Name() string { return "serverstatus.report" }

func (w *Reporter) Interval() time.Duration { return w.opts.Interval }

func (w *Reporter) Run(ctx context.Context) error {
	now := time.Now()

	proxyWorking := w.pingProxy()
	databaseWorking := w.pingDatabase()
	cacheWorking := w.pingCache(ctx)
	emailsWorking := w.pingEmails()

	const query = `
		INSERT INTO server_data (info_name, working, uptime, updated_at)
		VALUES
			('Proxy', $1, $2, NOW()),
			('Database', $3, $4, NOW()),
			('Cache', $5, $6, NOW()),
			('Emails', $7, $8, NOW())
		ON CONFLICT (info_name)
		DO UPDATE SET
			working = EXCLUDED.working,
			uptime = EXCLUDED.uptime,
			updated_at = EXCLUDED.updated_at;
	`

	_, err := w.db.ExecContext(ctx, query,
		proxyWorking, now,
		databaseWorking, now,
		cacheWorking, now,
		emailsWorking, now,
	)

	return err
}

func (w *Reporter) pingProxy() bool {
	resp, err := http.Get("https://noxacloud.com.br/cdn-cgi/trace")
	if err != nil {
		return false
	}
	defer resp.Body.Close()

	return resp.StatusCode == http.StatusOK
}

func (w *Reporter) pingDatabase() bool {
	return w.db.Ping() == nil
}

func (w *Reporter) pingCache(ctx context.Context) bool {
	status, err := w.rdb.Ping(ctx).Result()
	if err != nil {
		return false
	}

	return status == "PONG"
}

// pingEmails always reports healthy: no email transport is configured yet.
// Wire this up to a real check once one exists.
func (w *Reporter) pingEmails() bool {
	return true
}
