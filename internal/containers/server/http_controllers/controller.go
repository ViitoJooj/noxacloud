package http_controllers

import (
	"net/http"

	server_usecases "github.com/ViitoJooj/noxacloud/internal/containers/server/usecases"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
	"github.com/ViitoJooj/noxacloud/pkg/utils"
	"github.com/gin-gonic/gin"
)

type RegisterServerControllersInput struct {
	Router        *gin.RouterGroup
	HealthUseCase contracts.IUseCase[server_usecases.HealthUseCaseInput, server_usecases.HealthUseCaseOutput]
	PingUseCase   contracts.IUseCase[server_usecases.PingUseCaseInput, server_usecases.PingUseCaseOutput]
}

func RegisterServerControllers(input RegisterServerControllersInput) error {

	err := utils.AssertNotNilParams(
		map[string]any{
			"input.Router":        input.Router,
			"input.HealthUseCase": input.HealthUseCase,
			"input.PingUseCase":   input.PingUseCase,
		},
	)
	if err != nil {
		return err
	}

	basePath := "/v1"

	base := input.Router.Group(basePath)
	{
		base.GET("/health", health(input.HealthUseCase))
		base.Any("/ping", ping(input.PingUseCase))
	}

	return nil
}

func health(useCase contracts.IUseCase[server_usecases.HealthUseCaseInput, server_usecases.HealthUseCaseOutput]) func(c *gin.Context) {
	return func(c *gin.Context) {

		output, err := useCase.Perform(c, server_usecases.HealthUseCaseInput{})
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		c.JSON(http.StatusOK, output)
	}
}

func ping(useCase contracts.IUseCase[server_usecases.PingUseCaseInput, server_usecases.PingUseCaseOutput]) func(c *gin.Context) {
	return func(c *gin.Context) {

		output, err := useCase.Perform(c, server_usecases.PingUseCaseInput{})
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		c.BSON(http.StatusOK, output)
	}
}
