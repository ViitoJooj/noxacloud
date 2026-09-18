package usecases

import (
	"context"

	"github.com/ViitoJooj/noxacloud/internal/containers/server/entities"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
)

type HealthUseCase struct {
	Repository contracts.IRepository[entities.ServerInfo, entities.ServerInfo]
}

func NewHealthUseCase(repository contracts.IRepository[entities.ServerInfo, entities.ServerInfo]) HealthUseCase {
	return HealthUseCase{
		Repository: repository,
	}
}

type HealthUseCaseInput struct{}

type HealthUseCaseOutput struct {
	Data entities.ServerInfo
}

func (u HealthUseCase) Perform(ctx context.Context, _ HealthUseCaseInput) (HealthUseCaseOutput, error) {

	data, err := u.Repository.List(ctx)
	if err != nil {
		return HealthUseCaseOutput{}, err
	}

	if len(data) == 0 {
		return HealthUseCaseOutput{}, nil
	}

	return HealthUseCaseOutput{Data: data[0]}, nil
}
