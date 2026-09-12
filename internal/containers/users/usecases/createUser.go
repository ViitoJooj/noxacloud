package usecases

import (
	"context"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
)

func (u UsersUseCase) CreateUser(ctx context.Context, input entities.User) (*entities.User, error) {

	data, err := entities.NewUser(input.Name, input.Email, input.Phone, input.CPF, input.CNPJ, input.Password)
	if err != nil {
		return nil, err
	}

	exists, err := u.Repository.UserExist(ctx, data)
	if err != nil || exists {
		return nil, err
	}

	output, err := u.Repository.CreateUser(ctx, data)
	if err != nil {
		return nil, err
	}

	return &output, nil
}
