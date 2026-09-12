package routers

import (
	"github.com/ViitoJooj/noxacloud/internal/containers/users/controllers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(router gin.IRouter, controller *controllers.UsersController) {
	router.POST("/v1/users", controller.CreateUser)
	router.GET("/v1/users", controller.GetUsers)
	router.GET("/v1/users/:id", controller.GetUser)
}
