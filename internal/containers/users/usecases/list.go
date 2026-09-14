package users_usecases

import (
	"context"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
)

type ListUsersUseCase struct {
	Repository contracts.IRepository[entities.User, entities.User]
}

func NewListUsersUseCase(repository contracts.IRepository[entities.User, entities.User]) ListUsersUseCase {
	return ListUsersUseCase{
		Repository: repository,
	}
}

type ListUsersUseCaseInput struct{}

type ListUsersUseCaseOutput struct {
	Data []entities.User
}

func (u ListUsersUseCase) Perform(ctx context.Context, _ ListUsersUseCaseInput) (ListUsersUseCaseOutput, error) {

	data, err := u.Repository.List(ctx)
	if err != nil {
		return ListUsersUseCaseOutput{}, err
	}

	return ListUsersUseCaseOutput{Data: data}, nil
}
