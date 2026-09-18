package dbcleanup

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/ViitoJooj/noxacloud/internal/contracts"
	"github.com/ViitoJooj/noxacloud/pkg/logs"
)

type OldUsersCleaner struct {
	db   *sql.DB
	opts contracts.WorkerOptions
}

func NewOldUsersCleaner(db *sql.DB, opts ...contracts.WorkerOption) *OldUsersCleaner {
	return &OldUsersCleaner{db: db, opts: contracts.NewWorkerOptions(12*time.Hour, opts...)}
}

func (w *OldUsersCleaner) Name() string { return "dbcleanup.old_users" }

func (w *OldUsersCleaner) Interval() time.Duration { return w.opts.Interval }

func (w *OldUsersCleaner) Run(ctx context.Context) error {
	const query = `DELETE FROM users WHERE deleted_at < NOW() - INTERVAL '1 year';`

	result, err := w.db.ExecContext(ctx, query)
	if err != nil {
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		return err
	}

	logs.Info(ctx, fmt.Sprintf("%d rows removed", rowsAffected))

	return nil
}
