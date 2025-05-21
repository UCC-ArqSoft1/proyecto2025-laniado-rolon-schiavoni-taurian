package app

import (
	"backend/controllers"
)

func mapUrls() {
	//router.GET("/activities", controllers.GetAllActivities)             //trae todas las actividades
	router.GET("/activities/:id", controllers.GetActivityByID)   //trae una actividad por id
	router.GET("/activities", controllers.GetFilteredActivities) //trae todas las actividades o filtradas por categoria, nombre o descripcion
	router.POST("/users/login", controllers.Login)
	router.POST("/users/inscription", controllers.Inscription)
	router.GET("/users/:id", controllers.GetUserByID)                  //trae un usuario por id
	router.GET("/users/:id/activities", controllers.GetUserActivities) //trae todas las actividades de un usuario

	//router.GET("/activities/:id", controllers.GetActivityByID)//trae una actividad por id

}
