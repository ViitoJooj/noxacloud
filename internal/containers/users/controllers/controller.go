package controllers

import "github.com/ViitoJooj/noxacloud/internal/containers/users/usecases"

type UsersController struct {
	UseCase usecases.UsersUseCase
}

func NewUsersController(useCase usecases.UsersUseCase) *UsersController {
	return &UsersController{
		UseCase: useCase,
	}
}
