package main

import (
	//importo modulo propio
	"backend/controllers"
	_ "fmt" //importo libreria externa

	"github.com/gin-gonic/gin" //importo un link
)

func main() {

	router := gin.New() //variable que me apunta al llamado
	//el segundo parametro que recibe la funcion Get es la declaracion de una funcion, osea no se ejecutara en ese momento
	//la funcion GetHotel es lo que va a hacer cuando se produzca ese llamado, es una referencia a la funcion, ya que no pasamos parametros
	router.GET("/activities/:id", controllers.GetActivityByID)
	router.GET("/categories", controllers.GetAllCategories)
	router.GET("/activities/category/:id", controllers.GetAllActivitiesByCategoryID)
	router.Run()

}
