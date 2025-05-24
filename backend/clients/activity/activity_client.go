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

func GetActivityByID(id int) (model.ActivityModel, error) {
	var activity model.ActivityModel
	var err error
	Db.Preload("InscriptionsActivity.Activity").First(&activity, id)

	if activity.ID == 0 {
		log.Error("Activity not found")
		err = gorm.ErrRecordNotFound
		return activity, err
	}

	log.Debugf("Activity Found: %+v", activity)

	return activity, err
}

func GetFilteredActivities(category string, name string, description string, schedule string) (model.Activities, error) {
	var activities model.Activities
	var err error

	query := Db // comenzamos con el DB base

	if category != "" {
		query = query.Where("category = ?", category)
	}
	if name != "" {
		query = query.Where("name LIKE ?", "%"+name+"%")
	}
	if description != "" {
		query = query.Where("description LIKE ?", "%"+description+"%")
	}
	if schedule != "" {
		query = query.Where("schedule LIKE ?", "%"+schedule+"%")
	}

	query.Find(&activities)

	if len(activities) == 0 {
		log.Error("No activities found")
		err = gorm.ErrRecordNotFound
		return activities, err
	}
	log.Debugf("Filtered Activities Found: %+v", activities)

	return activities, err
}
