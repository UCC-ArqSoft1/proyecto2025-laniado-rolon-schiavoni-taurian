package domain

type Activity struct {
	ID           int        `json:"id"`       //PK
	CategoryID   int        `json:"category"` //FK
	Name         string     `json:"name"`
	Description  string     `json:"description"`
	Id_professor int        `json:"id_professor"` //FK
	Quotas       int        `json:"quotas"`       //Cupos
	Schedules    []Schedule `json:"schedules"`
	Active       bool       `json:"active"`
}

type Schedule struct {
	ID            int    `json:"id"`            //PK
	ID_activities int    `json:"id_activities"` //FK
	Day           string `json:"day"`           //Monday, Tuesday, etc.
	Start_time    int    `json:"start_time"`    //start time in military time format (e.g., 1400 for 2 PM)
	Act_duration  int    `json:"act_duration"`  //minutes
}
