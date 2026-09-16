package users_usecases

import (
	"context"
	"uuid"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
)

type UpdateUserByIDUseCase struct {
	Repository contracts.IRepository[entities.User, entities.User]
}

func NewUpdateUserByIDUseCase(repository contracts.IRepository[entities.User, entities.User]) UpdateUserByIDUseCase {
	return UpdateUserByIDUseCase{
		Repository: repository,
	}
}

type UpdateUserByIDUseCaseInput struct {
	ID   *uuid.UUID
	Data entities.User
}

type UpdateUserByIDUseCaseOutput struct {
	Data entities.User
}

// TODO: validar dados antes de atualizar
func (u UpdateUserByIDUseCase) Perform(ctx context.Context, input UpdateUserByIDUseCaseInput) (UpdateUserByIDUseCaseOutput, error) {

	output, err := u.Repository.Update(ctx, input.ID, input.Data)
	if err != nil {
		return UpdateUserByIDUseCaseOutput{}, err
	}

	return UpdateUserByIDUseCaseOutput{Data: output}, nil
}
