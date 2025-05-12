package domain

type Activity struct {
	ID           int       `json:"id"`       //PK
	Category     string    `json:"category"` //FK
	Name         string    `json:"name"`
	Description  string    `json:"description"`
	ProfesorName string    `json:"profesor_name"`
	Quotas       int       `json:"quotas"` //Cupos
	Schedules    Schedules `json:"schedules"`
	Active       bool      `json:"active"`
}
type Activities []Activity
