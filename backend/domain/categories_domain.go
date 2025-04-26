package domain

type Category struct {
	ID            int    `json:"id"`
	Name          string `json:"name"`
	ActivitiesIDs []int  `json:"activities"`
}
