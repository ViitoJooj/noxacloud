package usecases

import (
	"context"
	"uuid"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
)

func (u UsersUseCase) GetUser(ctx context.Context, id *uuid.UUID) (*entities.User, []entities.User, error) {

	if id != nil {
		data, err := u.Repository.GetUserById(ctx, id)
		if err != nil {
			return nil, nil, err
		}
		return &data, nil, nil
	}

	data, err := u.Repository.GetUsers(ctx)
	if err != nil {
		return nil, nil, err
	}

	return nil, data, nil
}
