package users_usecases

import (
	"context"
	"uuid"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
)

type DeleteUserByIDUseCase struct {
	Repository contracts.IRepository[entities.User, entities.User]
}

func NewDeleteUserByIDUseCase(repository contracts.IRepository[entities.User, entities.User]) DeleteUserByIDUseCase {
	return DeleteUserByIDUseCase{
		Repository: repository,
	}
}

type DeleteUserByIDUseCaseInput struct {
	ID *uuid.UUID
}

type DeleteUserByIDUseCaseOutput struct{}

func (u DeleteUserByIDUseCase) Perform(ctx context.Context, input DeleteUserByIDUseCaseInput) (DeleteUserByIDUseCaseOutput, error) {

	if err := u.Repository.Delete(ctx, input.ID); err != nil {
		return DeleteUserByIDUseCaseOutput{}, err
	}

	return DeleteUserByIDUseCaseOutput{}, nil
}
