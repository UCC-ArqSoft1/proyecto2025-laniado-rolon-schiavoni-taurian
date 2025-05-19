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
