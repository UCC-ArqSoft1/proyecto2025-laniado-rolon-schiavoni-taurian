package controllers

import (
	"backend/services"
	_ "strconv"

	"github.com/gin-gonic/gin"
)

func GetAllCategories(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")

	categories := services.GetAllCategories()
	ctx.JSON(200, categories)
}
