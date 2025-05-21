package controllers

import (
	"backend/dto"
	"backend/services"
	"backend/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

func Login(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")
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

func GetUserByID(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")
	// recibo el id del usuario desde el path de la request
	userID := ctx.Param("id")
	// hago string a int
	userIDInt, err := strconv.Atoi(userID)
	// llamar al servicio de get user by id
	user, err := services.GetUserByID(userIDInt)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	// si el usuario existe, devolver el usuario
	ctx.JSON(http.StatusOK, user)
}

func GetUserActivities(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")
	// recibo el id del usuario desde el path de la request
	userID := ctx.Param("id")
	// hago string a int
	userIDInt, err := strconv.Atoi(userID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}
	// llamar al servicio de get user activities
	activities, err := services.GetUserActivities(userIDInt)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}
	// si el usuario existe, devolver las actividades
	ctx.JSON(http.StatusOK, activities)
}
