package services

import (
	userCLient "backend/clients/user"
	"backend/dto"
	"backend/utils"
	"fmt"
)

func Login(username string, password string) (int, string, string, error) {
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

func GetUserByID(id int) (dto.UserDto, error) {
	userModel, err := userCLient.GetUserByID(id)
	if err != nil {
		return dto.UserDto{}, fmt.Errorf("failed to get user by id: %w", err)
	}

	var insDto dto.Inscriptions
	for _, ins := range userModel.InscriptionsUser {
		insDto = append(insDto, dto.InscriptionDto{
			ID:              ins.ID,
			UserID:          ins.UserID,
			ActivityID:      ins.ActivityID,
			DateInscription: ins.DateInscription,
			Active:          ins.Active,
		})

	}
	return dto.UserDto{
		ID:               userModel.ID,
		FirstName:        userModel.FirstName,
		LastName:         userModel.LastName,
		Email:            userModel.Email,
		InscriptionsUser: insDto,
	}, err
}

func GetUserActivities(id int) (dto.ActivitiesDto, error) {
	activityModel, err := userCLient.GetUserActivities(id)
	if err != nil {
		return dto.ActivitiesDto{}, fmt.Errorf("failed to get user activities: %w", err)
	}

	var actDto dto.ActivitiesDto
	for _, act := range activityModel {
		actDto = append(actDto, dto.ActivityDto{
			ID:           act.ID,
			Name:         act.Name,
			ProfesorName: act.ProfesorName,
			Description:  act.Description,
			Category:     act.Category,
			Schedules:    act.Schedule,
			Active:       act.Active,
			Photo:        act.Photo,
		})
	}
	return actDto, nil
}
