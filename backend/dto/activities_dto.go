package dto

type ActivityDto struct {
	ID           int    `json:"id"`       //PK
	Category     string `json:"category"` //FK
	Name         string `json:"name"`
	Description  string `json:"description"`
	ProfesorName string `json:"profesor_name"`
	Quotas       int    `json:"quotas"` //Cupos
	Schedules    string `json:"schedules"`
	//InscriptionsActivity Inscriptions `json:"inscriptions"` //FK
	Active bool   `json:"active"`
	Photo  string `json:"photo"`
}

type ActivitiesDto []ActivityDto
