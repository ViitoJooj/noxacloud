package usecases

import "github.com/ViitoJooj/noxacloud/internal/contracts"

type Input struct {
}

type Output struct {
}

type useCase struct{}

func NewUsersUseCase() contracts.IUseCase[Input, Output] {
	return &useCase{}
}

func (u *useCase) Perform(in Input) (Output, error) {
	var output Output

	return output, nil
}
