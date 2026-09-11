package containers

import "github.com/ViitoJooj/noxacloud/internal/containers/users/usecases"

func NewContainer() {
	userUseCase := usecases.NewUsersUseCase()
}
