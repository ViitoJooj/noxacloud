package usecases

import "github.com/ViitoJooj/noxacloud/internal/containers/users/repositories"

type UsersUseCase struct {
	Repository repositories.UsersContracts
}

func NewUsersUseCase(repository repositories.UsersContracts) UsersUseCase {
	return UsersUseCase{
		Repository: repository,
	}
}
