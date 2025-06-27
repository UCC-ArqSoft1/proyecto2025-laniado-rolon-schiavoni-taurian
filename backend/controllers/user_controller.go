package controllers

import (
	"backend/dto"
	"backend/services"
	"net/http"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

func Login(ctx *gin.Context) {
	var request dto.LoginRequest

	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	// Llamar al servicio de login
	token, name, surname, isAdmin, err := services.Login(request.Email, request.Password)
	if err != nil {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "No se pudo iniciar sesión"})
		return
	}

	// Respuesta exitosa
	ctx.JSON(http.StatusOK, dto.LoginResponse{
		Token:   token,
		Name:    name,
		Surname: surname,
		IsAdmin: isAdmin,
	})
}

func GetUserByID(ctx *gin.Context) {
	userID := ctx.Param("id")
	userIDInt, err := strconv.Atoi(userID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	user, err := services.GetUserByID(userIDInt)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "El usuario no existe"})
		return
	}

	ctx.JSON(http.StatusOK, user)
}

func GetUserActivities(ctx *gin.Context) {
	userID := ctx.Param("id")
	userIDInt, err := strconv.Atoi(userID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	activities, err := services.GetUserActivities(userIDInt)
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "El usuario no tiene actividades"})
		return
	}

	ctx.JSON(http.StatusOK, activities)
}

func VerifyToken(ctx *gin.Context) {
	// Obtener token desde el header
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Token is required"})
		return
	}

	// Extraer solo el token sin el "Bearer "
	token := strings.TrimPrefix(authHeader, "Bearer ")

	// Verificar token
	_, err := services.VerifyToken(token)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"status": "Token válido"})
}
