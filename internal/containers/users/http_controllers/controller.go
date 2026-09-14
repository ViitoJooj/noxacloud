package http_controllers

import (
	"net/http"
	"uuid"

	users_usecases "github.com/ViitoJooj/noxacloud/internal/containers/users/usecases"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
	"github.com/ViitoJooj/noxacloud/pkg/utils"
	"github.com/gin-gonic/gin"
)

type RegisterUsersControllersInput struct {
	Router            *gin.RouterGroup
	CreateUseCase     contracts.IUseCase[users_usecases.CreateUserUseCaseInput, users_usecases.CreateUserUseCaseOutput]
	ListUseCase       contracts.IUseCase[users_usecases.ListUsersUseCaseInput, users_usecases.ListUsersUseCaseOutput]
	GetByIdUseCase    contracts.IUseCase[users_usecases.GetUserByIDUseCaseInput, users_usecases.GetUserByIDUseCaseOutput]
	UpdateByIdUseCase contracts.IUseCase[users_usecases.UpdateUserByIDUseCaseInput, users_usecases.UpdateUserByIDUseCaseOutput]
	DeleteByIdUseCase contracts.IUseCase[users_usecases.DeleteUserByIDUseCaseInput, users_usecases.DeleteUserByIDUseCaseOutput]
}

func RegisterUsersControllers(input RegisterUsersControllersInput) error {

	err := utils.AssertNotNilParams(
		map[string]any{
			"input.Router":            input.Router,
			"input.CreateUseCase":     input.CreateUseCase,
			"input.ListUseCase":       input.ListUseCase,
			"input.GetByIdUseCase":    input.GetByIdUseCase,
			"input.UpdateByIdUseCase": input.UpdateByIdUseCase,
			"input.DeleteByIdUseCase": input.DeleteByIdUseCase,
		},
	)
	if err != nil {
		return err
	}

	basePath := "/v1/users"

	base := input.Router.Group(basePath)
	{
		base.POST("", create(input.CreateUseCase))
		base.GET("", list(input.ListUseCase))

		byId := base.Group("/:id")
		{
			byId.GET("", getByID(input.GetByIdUseCase))
			byId.PATCH("", updateByID(input.UpdateByIdUseCase))
			byId.DELETE("", deleteByID(input.DeleteByIdUseCase))
		}
	}

	return nil
}

func create(useCase contracts.IUseCase[users_usecases.CreateUserUseCaseInput, users_usecases.CreateUserUseCaseOutput]) func(c *gin.Context) {
	return func(c *gin.Context) {
		var input users_usecases.CreateUserUseCaseInput
		err := c.ShouldBind(&input.Data)
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		output, err := useCase.Perform(c, input)
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		c.JSON(http.StatusCreated, output)

	}
}

func list(useCase contracts.IUseCase[users_usecases.ListUsersUseCaseInput, users_usecases.ListUsersUseCaseOutput]) func(c *gin.Context) {
	return func(c *gin.Context) {
		output, err := useCase.Perform(c, users_usecases.ListUsersUseCaseInput{})
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		c.JSON(http.StatusOK, output)
	}
}

func getByID(useCase contracts.IUseCase[users_usecases.GetUserByIDUseCaseInput, users_usecases.GetUserByIDUseCaseOutput]) func(c *gin.Context) {
	return func(c *gin.Context) {
		id, err := uuid.Parse(c.Param("id"))
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		output, err := useCase.Perform(c, users_usecases.GetUserByIDUseCaseInput{ID: &id})
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		c.JSON(http.StatusOK, output)
	}
}

func updateByID(useCase contracts.IUseCase[users_usecases.UpdateUserByIDUseCaseInput, users_usecases.UpdateUserByIDUseCaseOutput]) func(c *gin.Context) {
	return func(c *gin.Context) {
		id, err := uuid.Parse(c.Param("id"))
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		var input users_usecases.UpdateUserByIDUseCaseInput
		if err := c.ShouldBind(&input.Data); err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}
		input.ID = &id

		output, err := useCase.Perform(c, input)
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		c.JSON(http.StatusOK, output)
	}
}

func deleteByID(useCase contracts.IUseCase[users_usecases.DeleteUserByIDUseCaseInput, users_usecases.DeleteUserByIDUseCaseOutput]) func(c *gin.Context) {
	return func(c *gin.Context) {
		id, err := uuid.Parse(c.Param("id"))
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		_, err = useCase.Perform(c, users_usecases.DeleteUserByIDUseCaseInput{ID: &id})
		if err != nil {
			_ = c.Error(err)
			c.Abort()
			return
		}

		c.Status(http.StatusNoContent)
	}
}
