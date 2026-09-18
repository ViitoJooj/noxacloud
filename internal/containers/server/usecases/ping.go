package usecases

import (
	"context"
)

type PingUseCase struct {
}

func NewPingUseCase() PingUseCase {
	return PingUseCase{}
}

type PingUseCaseInput struct{}

type PingUseCaseOutput struct {
	Server string
}

func (u PingUseCase) Perform(ctx context.Context, _ PingUseCaseInput) (PingUseCaseOutput, error) {

	var output PingUseCaseOutput

	output.Server = "pong"

	return output, nil

}
