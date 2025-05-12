package domain

type Schedule struct {
	ID          int    `json:"id"`           //PK //FK
	Day         string `json:"day"`          //Monday, Tuesday, etc.
	StartTime   int    `json:"start_time"`   //start time in military time format (e.g., 1400 for 2 PM)
	ActDuration int    `json:"act_duration"` //minutes
}

type Schedules []Schedule
