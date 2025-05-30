package controllers

import (
	"backend/dto"
	"backend/services"

	"github.com/gin-gonic/gin"
)

func Inscription(ctx *gin.Context) {

	var request dto.InscriptionRequest
	//recibo el body de la request
	if err := ctx.ShouldBindJSON(&request); err != nil {
		ctx.JSON(400, gin.H{"error": "Invalid request"})
		return
	}

	//llamo al servicio de inscription
	err := services.Inscription(request.UserID, request.ActivityID)
	if err != nil {
		ctx.JSON(403, gin.H{"error": "Inscription failed"})
		return
	}

	ctx.JSON(200, gin.H{"message": "Inscription successful"})
}
