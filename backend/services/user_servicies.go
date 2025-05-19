package services

import (
	userCLient "backend/clients/user"
	"backend/utils"
	"fmt"
)

func Login(username string, password string) (int, string, string, error) {
	//userModel es una variable de tipo puntero a UserModel
	userModel, err := userCLient.GetUserByUsername(username)
	if err != nil {
		return 0, "", "", fmt.Errorf("failed to get user by user: %w", err)
	}
	if utils.HashSHA256(password) != userModel.PasswordHash {
		return 0, "", "", fmt.Errorf("invalid password")

	}

	token, err := utils.GenerateJWT(userModel.ID)
	if err != nil {
		return 0, "", "", fmt.Errorf("failed to generate token: %w", err)
	}

	name := userModel.FirstName
	return userModel.ID, token, name, nil
}
