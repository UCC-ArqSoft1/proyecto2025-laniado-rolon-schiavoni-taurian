package controllers

import (
	"backend/dto"
	"backend/services"
	"backend/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func Login(ctx *gin.Context) {
	var request dto.LoginRequest
	// recibo usuario y contraseña desde el body de la request
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// llamar al servicio de login
	// el servicio de login devuelve el id del usuario y el token
	log.Info(("Hash contrasenia: "), utils.HashSHA256(request.Password))
	ID, token, name, err := services.Login(request.Email, request.Password)
	if err != nil {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "no se pudo iniciar sesion"})
		return
	}
	// si el login es exitoso, devolver el id del usuario y el token
	// el token es un string que se genera al momento de hacer login
	ctx.JSON(http.StatusOK, dto.LoginResponse{
		UserID: ID,
		Token:  token,
		Name:   name,
	})
}
