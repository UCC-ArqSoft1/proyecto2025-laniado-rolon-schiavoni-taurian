package services

import (
	activityClient "backend/clients/activity"
	"backend/dto"
	"backend/model"
)

func GetActivityByID(id int) (dto.ActivityDto, error) {
	var activity model.ActivityModel
	var err error
	activity, err = activityClient.GetActivityByID(id)
	var activityDto dto.ActivityDto
	var insDto dto.Inscriptions

	for _, ins := range activity.InscriptionsActivity {

		insDto = append(insDto, dto.InscriptionDto{
			ID:              ins.ID,
			UserID:          ins.UserID,
			ActivityID:      ins.ActivityID,
			DateInscription: ins.DateInscription,
			Active:          ins.Active,
		})
	}

	activityDto.ID = activity.ID
	activityDto.Category = activity.Category
	activityDto.Name = activity.Name
	activityDto.Description = activity.Description
	activityDto.ProfesorName = activity.ProfesorName
	activityDto.Quotas = activity.Quotas
	activityDto.Schedules = activity.Schedule
	activityDto.InscriptionsActivity = insDto
	activityDto.Active = activity.Active
	activityDto.Photo = activity.Photo
	return activityDto, err
}

func GetFilteredActivities(category string, name string, description string, schedule string, professor_name string) (dto.ActivitiesDto, error) {
	var activities model.Activities
	var activitiesDto dto.ActivitiesDto
	var err error

	activities, err = activityClient.GetFilteredActivities(category, name, description, schedule, professor_name)

	for _, activity := range activities {
		var insDto dto.Inscriptions
		for _, ins := range activity.InscriptionsActivity {
			insDto = append(insDto, dto.InscriptionDto{
				ID:              ins.ID,
				DateInscription: ins.DateInscription,
				Active:          ins.Active,
			})
		}
		activityDto := dto.ActivityDto{
			ID:                   activity.ID,
			Category:             activity.Category,
			Name:                 activity.Name,
			Description:          activity.Description,
			ProfesorName:         activity.ProfesorName,
			Quotas:               activity.Quotas,
			Schedules:            activity.Schedule,
			InscriptionsActivity: insDto,
			Active:               activity.Active,
			Photo:                activity.Photo,
		}
		activitiesDto = append(activitiesDto, activityDto)
	}

	return activitiesDto, err
}
