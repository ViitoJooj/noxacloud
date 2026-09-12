package controllers

import (
	"net/http"

	"github.com/ViitoJooj/noxacloud/internal/containers/users/entities"
	"github.com/gin-gonic/gin"
)

type createUserRequest struct {
	Name     string  `json:"name"`
	Email    *string `json:"email"`
	Phone    *string `json:"phone"`
	CPF      *string `json:"cpf"`
	CNPJ     *string `json:"cnpj"`
	Password string  `json:"password"`
}

func (c *UsersController) CreateUser(ctx *gin.Context) {

	var input createUserRequest

	if err := ctx.ShouldBindJSON(&input); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	user, err := c.UseCase.CreateUser(ctx.Request.Context(), entities.User{
		Name:     input.Name,
		Email:    input.Email,
		Phone:    input.Phone,
		CPF:      input.CPF,
		CNPJ:     input.CNPJ,
		Password: input.Password,
	})
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, user)
}
