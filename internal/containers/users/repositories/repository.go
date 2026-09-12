package repositories

import (
	"context"
	"uuid"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
)

type UsersContracts interface {
	CreateUser(ctx context.Context, data *entities.User) (entities.User, error)
	UserExist(ctx context.Context, data *entities.User) (bool, error)
	GetUserById(ctx context.Context, id *uuid.UUID) (entities.User, error)
	GetUsers(ctx context.Context) ([]entities.User, error)
}
