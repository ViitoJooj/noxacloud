package utils

import (
	"context"
	"database/sql"
)

func SaveIsertionMetadata(ctx context.Context, pgdb *sql.DB, action string, payload *string, status string, errorMessage error) error {
	query := `INSERT INTO action_confirm (action, payload, status, error_message) VALUES ($1, $2, $3, $4)`
	_, err := pgdb.QueryContext(ctx, query, action, payload, status, errorMessage)
	if err != nil {
		return err
	}

	return nil
}
