package dao

type Activity struct {
	ID           int    `gorm:"primaryKey"`                 //PK
	Category     string `gorm:"type:varchar(100);not null"` //FK
	Name         string `gorm:"type:varchar(100);not null"`
	Description  string `gorm:"type:varchar(350);not null"`
	ProfesorName string `gorm:"type:varchar(100);not null"`
	Quotas       int
	Schedules    Schedules       `gorm:"foreignKey:IDActivity"` //FK
	Active       bool            `gorm:"default:true"`
	Inscriptions InscriptionList `gorm:"foreignKey:ActividadID"` //FK
}
