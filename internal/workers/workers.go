package workers

import (
	"context"
	"database/sql"
	"time"

	"github.com/ViitoJooj/noxacloud/internal/workers/clean_database"
)

func Exec(ctx context.Context, db *sql.DB) {
	nextTimer := time.Now().Add(12 * time.Hour)
	await := time.Until(nextTimer)
	timer := time.NewTimer(await)

	defer timer.Stop()

	select {
	case <-timer.C:
		clean_database.CleanActionConfirm(ctx, db)
		clean_database.DeletedOldUsers(ctx, db)

	case <-ctx.Done():
		return
	}
}
