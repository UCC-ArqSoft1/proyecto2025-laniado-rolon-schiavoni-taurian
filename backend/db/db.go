package db

import (
	activityClient "backend/clients/activity"
	inscriptionClient "backend/clients/inscription"
	userCLient "backend/clients/user"
	"backend/model"
	"fmt"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func init() {
	dsn := "root:Schi@voni04@tcp(127.0.0.1:3306)/arqui_software?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}
	activityClient.Db = DB
	userCLient.Db = DB
	inscriptionClient.Db = DB

	log.Info("Finishing Migration Database Tables")
}

func StartDbEngine() {
	// Migrating all classes model.
	if err := DB.AutoMigrate(&model.ActivityModel{}); err != nil {
		panic(fmt.Sprintf("Error creating table: %v", err))
	}
	if err := DB.AutoMigrate(&model.UserModel{}); err != nil {
		panic(fmt.Sprintf("Error creating table: %v", err))
	}
	if err := DB.AutoMigrate(&model.InscriptionModel{}); err != nil {
		panic(fmt.Sprintf("Error creating table: %v", err))
	}
}
