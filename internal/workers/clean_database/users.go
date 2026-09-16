package clean_database

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/ViitoJooj/noxacloud/pkg/logs"
)

func DeletedOldUsers(ctx context.Context, db *sql.DB) {
	query := `DELETE FROM users WHERE deleted_at < NOW() - INTERVAL '1 year';`
	rows, err := db.ExecContext(ctx, query)
	if err != nil {
		logs.Error(ctx, err.Error())
	}

	rowsEffected, err := rows.RowsAffected()
	if err != nil {
		logs.Error(ctx, err.Error())
	}

	message := fmt.Sprintf("%d, Rows effected", rowsEffected)
	logs.Info(ctx, message)
}
