package repositories

import (
	"context"
	"database/sql"
	"uuid"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
	"github.com/ViitoJooj/noxacloud/pkg/logs"
	"github.com/ViitoJooj/noxacloud/pkg/utils"
)

type UsersRepository struct {
	DB *sql.DB
}

func NewUsersRepository(db *sql.DB) UsersRepository {
	return UsersRepository{
		DB: db,
	}
}

func (r UsersRepository) Save(ctx context.Context, input entities.User) (entities.User, error) {

	const query = `
		INSERT INTO users (name, email, phone, cpf, cnpj, password, role)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id, name, email, phone, cpf, cnpj, password, role, updated_at, created_at, deleted_at
	`

	var (
		idStr   string
		roleStr string
	)

	var user entities.User

	err := r.DB.QueryRowContext(ctx, query, input.Name, input.Email, input.Phone, input.CPF, input.CNPJ, input.Password, input.Role).Scan(
		&idStr,
		&user.Name,
		&user.Email,
		&user.Phone,
		&user.CPF,
		&user.CNPJ,
		&user.Password,
		&roleStr,
		&user.UpdatedAt,
		&user.CreatedAt,
		&user.DeletedAt,
	)
	if err != nil {
		return entities.User{}, err
	}

	id, err := uuid.Parse(idStr)
	if err != nil {
		return entities.User{}, err
	}

	user.ID = id
	user.Role = entities.Role(roleStr)

	err = utils.SaveIsertionMetadata(ctx, r.DB, "insert.users", nil, "SUCCESS", nil)
	if err != nil {
		logs.Error(ctx, err.Error())
		utils.SaveIsertionMetadata(ctx, r.DB, "insert.action_confirm", nil, "FAILED", err)
	}

	return user, nil
}

func (r UsersRepository) Exists(ctx context.Context, input entities.User) (bool, error) {

	const query = `
		SELECT EXISTS(
			SELECT 1 FROM users
			WHERE deleted_at IS NULL
			AND (
				email = $1
				OR ($2::VARCHAR IS NOT NULL AND cpf = $2)
				OR ($3::VARCHAR IS NOT NULL AND cnpj = $3)
			)
		)
	`

	var exists bool

	err := r.DB.QueryRowContext(ctx, query, input.Email, input.CPF, input.CNPJ).Scan(&exists)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (r UsersRepository) GetByID(ctx context.Context, id *uuid.UUID) (entities.User, error) {

	const query = `
		SELECT id, name, email, phone, cpf, cnpj, role, updated_at, created_at, deleted_at
		FROM users
		WHERE id = $1 AND deleted_at IS NULL
	`

	var (
		idStr   string
		roleStr string
	)

	var user entities.User

	err := r.DB.QueryRowContext(ctx, query, id.String()).Scan(
		&idStr,
		&user.Name,
		&user.Email,
		&user.Phone,
		&user.CPF,
		&user.CNPJ,
		&roleStr,
		&user.UpdatedAt,
		&user.CreatedAt,
		&user.DeletedAt,
	)
	if err != nil {
		return entities.User{}, err
	}

	parsedID, err := uuid.Parse(idStr)
	if err != nil {
		return entities.User{}, err
	}

	user.ID = parsedID
	user.Role = entities.Role(roleStr)

	return user, nil
}

func (r UsersRepository) List(ctx context.Context) ([]entities.User, error) {

	const query = `
		SELECT id, name, email, phone, cpf, cnpj, role, updated_at, created_at, deleted_at
		FROM users
		WHERE deleted_at IS NULL
		ORDER BY created_at DESC
	`

	rows, err := r.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	output := make([]entities.User, 0)

	for rows.Next() {

		var (
			idStr   string
			roleStr string
		)

		var user entities.User

		err := rows.Scan(
			&idStr,
			&user.Name,
			&user.Email,
			&user.Phone,
			&user.CPF,
			&user.CNPJ,
			&roleStr,
			&user.UpdatedAt,
			&user.CreatedAt,
			&user.DeletedAt,
		)
		if err != nil {
			return nil, err
		}

		parsedID, err := uuid.Parse(idStr)
		if err != nil {
			return nil, err
		}

		user.ID = parsedID
		user.Role = entities.Role(roleStr)

		output = append(output, user)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return output, nil
}

func (r UsersRepository) Update(ctx context.Context, id *uuid.UUID, input entities.User) (entities.User, error) {

	const query = `
		UPDATE users
		SET name = $1, email = $2, phone = $3, cpf = $4, cnpj = $5, password = $6, updated_at = NOW()
		WHERE id = $7 AND deleted_at IS NULL
		RETURNING id, name, email, phone, cpf, cnpj, password, role, updated_at, created_at, deleted_at
	`

	var (
		idStr   string
		roleStr string
	)

	var user entities.User

	err := r.DB.QueryRowContext(ctx, query, input.Name, input.Email, input.Phone, input.CPF, input.CNPJ, input.Password, id.String()).Scan(
		&idStr,
		&user.Name,
		&user.Email,
		&user.Phone,
		&user.CPF,
		&user.CNPJ,
		&user.Password,
		&roleStr,
		&user.UpdatedAt,
		&user.CreatedAt,
		&user.DeletedAt,
	)
	if err != nil {
		return entities.User{}, err
	}

	parsedID, err := uuid.Parse(idStr)
	if err != nil {
		return entities.User{}, err
	}

	user.ID = parsedID
	user.Role = entities.Role(roleStr)

	err = utils.SaveIsertionMetadata(ctx, r.DB, "update.users", nil, "SUCCESS", nil)
	if err != nil {
		logs.Error(ctx, err.Error())
		utils.SaveIsertionMetadata(ctx, r.DB, "insert.action_confirm", nil, "FAILED", err)
	}

	return user, nil
}

func (r UsersRepository) Delete(ctx context.Context, id *uuid.UUID) error {

	const query = `
		UPDATE users
		SET deleted_at = NOW()
		WHERE id = $1 AND deleted_at IS NULL
	`

	_, err := r.DB.ExecContext(ctx, query, id.String())

	err = utils.SaveIsertionMetadata(ctx, r.DB, "delete.users", nil, "SUCCESS", nil)
	if err != nil {
		logs.Error(ctx, err.Error())
		utils.SaveIsertionMetadata(ctx, r.DB, "insert.action_confirm", nil, "FAILED", err)
	}

	return err
}
