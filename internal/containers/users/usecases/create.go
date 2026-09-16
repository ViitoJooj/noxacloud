package users_usecases

import (
	"context"
	"errors"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
)

type CreateUserUseCase struct {
	Repository contracts.IRepository[entities.User, entities.User]
}

func NewCreateUserUseCase(repository contracts.IRepository[entities.User, entities.User]) CreateUserUseCase {
	return CreateUserUseCase{
		Repository: repository,
	}
}

type CreateUserUseCaseInput struct {
	Data entities.User
}

type CreateUserUseCaseOutput struct {
	Data entities.User
}

func (u CreateUserUseCase) Perform(ctx context.Context, input CreateUserUseCaseInput) (CreateUserUseCaseOutput, error) {

	data, err := entities.NewUser(input.Data.Name, input.Data.Email, input.Data.Phone, input.Data.CPF, input.Data.CNPJ, input.Data.Password)
	if err != nil {
		return CreateUserUseCaseOutput{}, err
	}

	data, err = data.SetHashedPassword()
	if err != nil {
		return CreateUserUseCaseOutput{}, err
	}

	exists, err := u.Repository.Exists(ctx, *data)
	if err != nil {
		return CreateUserUseCaseOutput{}, err
	}
	if exists {
		return CreateUserUseCaseOutput{}, errors.New("user already exists")
	}

	output, err := u.Repository.Save(ctx, *data)
	if err != nil {
		return CreateUserUseCaseOutput{}, err
	}

	return CreateUserUseCaseOutput{Data: output}, nil
}
