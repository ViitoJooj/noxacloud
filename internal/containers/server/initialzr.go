package server

import (
	"context"
	"database/sql"

	"github.com/ViitoJooj/noxacloud/internal/containers/server/http_controllers"
	"github.com/ViitoJooj/noxacloud/internal/containers/server/repositories"
	server_usecases "github.com/ViitoJooj/noxacloud/internal/containers/server/usecases"
	"github.com/ViitoJooj/noxacloud/pkg/ctxmod"
	"github.com/gin-gonic/gin"
)

func Init(ctx context.Context, server *gin.Engine, pgdb *sql.DB) error {

	ctx = ctxmod.SetFunc(ctx)

	serversRepositories := repositories.NewServerRepository(pgdb)

	err := http_controllers.RegisterServerControllers(http_controllers.RegisterServerControllersInput{
		Router:        &server.RouterGroup,
		HealthUseCase: server_usecases.NewHealthUseCase(&serversRepositories),
		PingUseCase:   server_usecases.NewPingUseCase(),
	})

	return err
}
