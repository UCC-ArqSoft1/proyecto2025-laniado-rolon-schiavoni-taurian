package clients

import (
	"backend/model"
	"fmt"

	"gorm.io/gorm"
)

var Db *gorm.DB

func GetUserByUsername(username string) (model.UserModel, error) {
	var user model.UserModel
	// Es equivalente a hacer un select * from users where username = username
	txn := Db.First(&user, "email = ?", username)
	if txn.Error != nil {
		return model.UserModel{}, fmt.Errorf("failed to get user by username: %w", txn.Error)
	}

	return user, nil
}

// getuserbyid
func GetUserByID(id int) (model.UserModel, error) {
	var user model.UserModel
	// Es equivalente a hacer un select * from users where id = id
	txn := Db.Where("id = ?", id).Preload("InscriptionsUser").First(&user)
	if txn.Error != nil {
		return model.UserModel{}, fmt.Errorf("failed to get user by id: %w", txn.Error)
	}
	return user, nil
}

func GetUserActivities(UserId int) ([]model.ActivityModel, error) {
	var user model.UserModel

	err := Db.Preload("InscriptionsUser.Activity").First(&user, UserId).Error
	if err != nil {
		return nil, fmt.Errorf("failed to get user with activities: %w", err)
	}

	var activitiesArray model.Activities
	for _, insc := range user.InscriptionsUser {
		activitiesArray = append(activitiesArray, insc.Activity)
	}

	return activitiesArray, nil
}
