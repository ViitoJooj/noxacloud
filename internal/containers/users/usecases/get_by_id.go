package users_usecases

import (
	"context"
	"uuid"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
)

type GetUserByIDUseCase struct {
	Repository contracts.IRepository[entities.User, entities.User]
}

func NewGetUserByIDUseCase(repository contracts.IRepository[entities.User, entities.User]) GetUserByIDUseCase {
	return GetUserByIDUseCase{
		Repository: repository,
	}
}

type GetUserByIDUseCaseInput struct {
	ID *uuid.UUID
}

type GetUserByIDUseCaseOutput struct {
	Data entities.User
}

func (u GetUserByIDUseCase) Perform(ctx context.Context, input GetUserByIDUseCaseInput) (GetUserByIDUseCaseOutput, error) {

	data, err := u.Repository.GetByID(ctx, input.ID)
	if err != nil {
		return GetUserByIDUseCaseOutput{}, err
	}

	return GetUserByIDUseCaseOutput{Data: data}, nil
}
