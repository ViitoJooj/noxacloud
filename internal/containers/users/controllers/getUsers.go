package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (c *UsersController) GetUsers(ctx *gin.Context) {

	_, list, err := c.UseCase.GetUser(ctx.Request.Context(), nil)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, list)
}
