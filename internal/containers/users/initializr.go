package users

import (
	"context"
	"database/sql"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/http_controllers"
	"github.com/ViitoJooj/noxacloud/internal/containers/users/repositories"
	users_usecases "github.com/ViitoJooj/noxacloud/internal/containers/users/usecases"
	"github.com/ViitoJooj/noxacloud/pkg/ctxmod"
	"github.com/gin-gonic/gin"
)

func Init(ctx context.Context, server *gin.Engine, db *sql.DB) error {

	ctx = ctxmod.SetFunc(ctx)

	usersRepository := repositories.NewUsersRepository(db)

	err := http_controllers.RegisterUsersControllers(http_controllers.RegisterUsersControllersInput{
		Router:            &server.RouterGroup,
		CreateUseCase:     users_usecases.NewCreateUserUseCase(usersRepository),
		ListUseCase:       users_usecases.NewListUsersUseCase(usersRepository),
		GetByIdUseCase:    users_usecases.NewGetUserByIDUseCase(usersRepository),
		UpdateByIdUseCase: users_usecases.NewUpdateUserByIDUseCase(usersRepository),
		DeleteByIdUseCase: users_usecases.NewDeleteUserByIDUseCase(usersRepository),
	})

	return err
}
