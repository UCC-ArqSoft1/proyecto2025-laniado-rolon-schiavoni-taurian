package services

import (
	"backend/domain"
)

func GetActivityByID(id int) domain.Activity {
	ActivityGet := hardcodeActivity(id)
	return ActivityGet
}

func GetAllActivitiesByCategoryID(id int) []domain.Activity {
	activities := hardcodeActivitiesByCategoryID(id)
	return activities
}

func hardcodeActivitiesByCategoryID(id int) []domain.Activity {
	activities := []domain.Activity{}
	if id == 1 {
		activities = append(activities, hardcodeActivity(0))
		activities = append(activities, hardcodeActivity(1))
	}
	return activities
}

func hardcodeActivity(id int) domain.Activity {
	Activity := domain.Activity{}
	if id == 0 {
		Activity = domain.Activity{
			ID:           0,
			CategoryID:   1,
			Name:         "Football",
			Description:  "Football activity",
			Id_professor: 1,
			Quotas:       20,
			Schedules: []domain.Schedule{
				{
					ID:            1,
					ID_activities: 0,
					Day:           "Monday",
					Start_time:    1400,
					Act_duration:  60,
				},
			},
			Active: true,
		}
	}

	if id == 1 {
		Activity = domain.Activity{
			ID:           1,
			CategoryID:   1,
			Name:         "Strength",
			Description:  "Strength activity",
			Id_professor: 2,
			Quotas:       10,
			Schedules: []domain.Schedule{
				{
					ID:            2,
					ID_activities: 1,
					Day:           "Tuesday",
					Start_time:    1000,
					Act_duration:  90,
				},
			},
			Active: true,
		}
	}
	return Activity
}
