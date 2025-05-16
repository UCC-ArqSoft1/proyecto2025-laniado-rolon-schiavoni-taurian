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

	log.Debugf("Activities Found: %+v", activities)

	return activities
}

func GetActivityByID(id int) model.ActivityModel {
	var activity model.ActivityModel
	Db.First(&activity, id)

	log.Debugf("Activity Found: %+v", activity)

	return activity
}
