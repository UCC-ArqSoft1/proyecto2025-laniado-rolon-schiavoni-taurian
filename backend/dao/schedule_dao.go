package dao

type Schedule struct {
	ID          int    `gorm:"primaryKey"` //PK
	Day         string //Monday, Tuesday, etc.
	StartTime   int    //start time in military time format (e.g., 1400 for 2 PM)
	ActDuration int    //minutes
	IDActivity  int
}

type Schedules []Schedule
