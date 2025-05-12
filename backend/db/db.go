package db

import (
	"backend/domain"

	log "github.com/sirupsen/logrus"

	"backend/services"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var (
	DB  *gorm.DB
	err error
)

func init() {
	dsn := "root:123456@tcp(127.0.0.1:3307)/db_arquitectura?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Info("Connection Failed to Open")
		log.Fatal(err)
	} else {
		log.Info("Connection Established")
	}
	services.Db = DB

}

func StartDbEngine() {
	// Migrating all classes model.
	DB.AutoMigrate(&domain.Activity{})
	DB.AutoMigrate(&domain.Schedule{})

	log.Info("Finishing Migration Database Tables")
	testgorm()
}

func testgorm() {
	services.InsertarActivity(0)
}
