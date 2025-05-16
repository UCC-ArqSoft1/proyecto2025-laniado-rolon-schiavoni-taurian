package clients

import (
	"backend/model"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var Db *gorm.DB

/*func CreateActivity(activity model.Activity) model.Activity {
	result := Db.Create(&activity)

	if result.Error != nil {
		//TODO Manage Errors
		log.Error("Error creating activity: ", result.Error)
	}
	log.Debug("Activity Created: ", activity.ID)
	return activity
}*/

func GetAllActivities() model.Activities {
	var activities model.Activities
	Db.Find(&activities)

	log.Debug("Activities Found: ", activities)

	return activities
}
