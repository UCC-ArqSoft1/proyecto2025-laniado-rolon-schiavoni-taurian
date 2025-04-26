package services

import (
	"backend/domain"
)

func GetAllCategories() []domain.Category {
	categories := hardcodeCategories()
	return categories
}

func hardcodeCategories() []domain.Category {
	categories := []domain.Category{
		{
			ID:            1,
			Name:          "Sports",
			ActivitiesIDs: []int{0, 1},
		},
		{
			ID:            2,
			Name:          "Fitness",
			ActivitiesIDs: []int{2, 3},
		},
	}
	return categories
}
