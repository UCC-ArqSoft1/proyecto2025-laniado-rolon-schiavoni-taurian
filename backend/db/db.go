package db

import (
	activityClient "backend/clients/activity"
	"backend/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func init() {
	dsn := "root:gabi12@tcp(127.0.0.1:3306)/arqui_software?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}
	activityClient.Db = DB

}

func StartDbEngine() {
	// Migrating all classes model.
	DB.AutoMigrate(&model.ActivityModel{})
	DB.AutoMigrate(&model.UserModel{})
	DB.AutoMigrate(&model.InscriptionModel{})

	log.Info("Finishing Migration Database Tables")
	testgorm()
}

func testgorm() {

}
