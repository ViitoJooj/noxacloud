package controllers

import (
	"net/http"
	"uuid"

	"github.com/gin-gonic/gin"
)

func (c *UsersController) GetUser(ctx *gin.Context) {

	id, err := uuid.Parse(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	user, _, err := c.UseCase.GetUser(ctx.Request.Context(), &id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, user)
}
