package app

import (
	"backend/controllers"
)

func mapUrls() {

	router.GET("/activities", controllers.GetAllActivities)    //trae todas las actividades
	router.GET("/activities/:id", controllers.GetActivityByID) //trae una actividad por id

	//router.GET("/activities/:id", controllers.GetActivityByID)//trae una actividad por id

}
