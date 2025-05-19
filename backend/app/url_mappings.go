package app

import (
	"backend/controllers"
)

func mapUrls() {
	//router.GET("/activities", controllers.GetAllActivities)             //trae todas las actividades
	router.GET("/activities/:id", controllers.GetActivityByID)   //trae una actividad por id
	router.GET("/activities", controllers.GetFilteredActivities) //trae todas las actividades o filtradas por categoria, nombre o descripcion
	router.POST("/users/login", controllers.Login)

	//router.GET("/activities/:id", controllers.GetActivityByID)//trae una actividad por id

}
