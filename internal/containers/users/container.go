package users

import (
	"database/sql"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/controllers"
	"github.com/ViitoJooj/noxacloud/internal/containers/users/repositories"
	"github.com/ViitoJooj/noxacloud/internal/containers/users/routers"
	"github.com/ViitoJooj/noxacloud/internal/containers/users/usecases"
	"github.com/gin-gonic/gin"
)

func Container(db *sql.DB, router gin.IRouter) *controllers.UsersController {

	repository := repositories.NewUsersRepository(db)
	usecase := usecases.NewUsersUseCase(repository)
	controller := controllers.NewUsersController(usecase)
	routers.RegisterRoutes(router, controller)

	return controller
}
