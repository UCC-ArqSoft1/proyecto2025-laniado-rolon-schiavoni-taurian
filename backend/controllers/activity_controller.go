package controllers

import (
	"backend/services" //importo modulo propio
	_ "fmt"            //importo libreria externa
	"strconv"

	"github.com/gin-gonic/gin" //importo un link
)

func GetActivityByID(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")

	activityIDString := ctx.Param("id")                  //me devuelve algo que quiero de la url, le debo poner el mismo nombre
	activityIDInt, err := strconv.Atoi(activityIDString) //convierto el dato en int, el err representa el error que devuelve el cambio de stoi, si no funciona, es una variable
	activity := services.GetActivityByID(activityIDInt)  //le paso el id de la url
	if err != nil {
		ctx.String(400, "Id invalido")
		return
	}
	ctx.JSON(200, activity) //devuelvo un JSON
}

func GetAllActivitiesByCategoryID(ctx *gin.Context) {
	ctx.Header("Access-Control-Allow-Origin", "*")
	ctx.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	ctx.Header("Access-Control-Allow-Headers", "Content-Type,Authorization")

	categoryIDString := ctx.Param("id")                                //me devuelve algo que quiero de la url, le debo poner el mismo nombre
	categoryIDInt, err := strconv.Atoi(categoryIDString)               //convierto el dato en int, el err representa el error que devuelve el cambio de stoi, si no funciona, es una variable
	activities := services.GetAllActivitiesByCategoryID(categoryIDInt) //le paso el id de la url
	if err != nil {
		ctx.String(400, "Id invalido")
		return
	}
	ctx.JSON(200, activities) //devuelvo un JSON
}
