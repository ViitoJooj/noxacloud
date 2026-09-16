package clean_database

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/ViitoJooj/noxacloud/pkg/logs"
)

func CleanActionConfirm(ctx context.Context, db *sql.DB) {
	query := `DELETE FROM action_confirm WHERE status = 'SUCCESS' AND updated_at < NOW() - INTERVAL '1 week';`
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
