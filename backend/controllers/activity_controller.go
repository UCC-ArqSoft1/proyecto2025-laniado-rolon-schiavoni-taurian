package controllers

import (
	//importo modulo propio
	"backend/services" //importo modulo propio
	"strconv"

	//importo modulo propio
	_ "fmt" //importo libreria externa

	"github.com/gin-gonic/gin" //importo un link
)

func GetActivityByID(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")

	activityIDString := ctx.Param("id")                  //me devuelve algo que quiero de la url, le debo poner el mismo nombre
	activityIDInt, err := strconv.Atoi(activityIDString) //convierto el dato en int, el err representa el error que devuelve el cambio de stoi, si no funciona, es una variable
	if err != nil {
		ctx.String(400, "Id invalido")
		return
	}
	activity, err1 := services.GetActivityByID(activityIDInt) //le paso el id de la url
	if err1 != nil {
		ctx.String(400, "Id invalido")
		return
	}
	ctx.JSON(200, activity) //devuelvo un JSON
}

func GetFilteredActivities(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")

	category := ctx.Query("category")
	name := ctx.Query("name")
	description := ctx.Query("description")
	schedule := ctx.Query("schedule")

	activities, err := services.GetFilteredActivities(category, name, description, schedule)
	if err != nil {
		ctx.String(400, "No hay actividades")
		return
	}

	ctx.JSON(200, activities)
}
