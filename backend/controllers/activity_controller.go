package controllers

import (
	"backend/services" //importo modulo propio
	_ "fmt"            //importo libreria externa
	"strconv"

	"github.com/gin-gonic/gin" //importo un link
)

func GetActivityByID(ctx *gin.Context) {

	activityIDString := ctx.Param("id")                  //me devuelve algo que quiero de la url, le debo poner el mismo nombre
	activityIDInt, err := strconv.Atoi(activityIDString) //convierto el dato en int, el err representa el error que devuelve el cambio de stoi, si no funciona, es una variable
	if err != nil {
		ctx.String(400, "Id invalido")
		return
	}
	activity, err1 := services.GetActivityByID(activityIDInt) //le paso el id de la url
	if err1 != nil {
		ctx.String(404, "Actividad no encontrada")
		return
	}
	ctx.JSON(200, activity) //devuelvo un JSON
}

func GetFilteredActivities(ctx *gin.Context) { //context contiene la info de la request y la response, yo la edito en esta funcion con lo que quiero

	category := ctx.Query("category")
	name := ctx.Query("name")
	description := ctx.Query("description")
	schedule := ctx.Query("schedule")
	professor_name := ctx.Query("professor_name")

	activities, err := services.GetFilteredActivities(category, name, description, schedule, professor_name)
	if err != nil {
		ctx.String(404, "No hay actividades")
		return
	}

	ctx.JSON(200, activities)
}
