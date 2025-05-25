package model

type ActivityModel struct {
	ID                   int          `gorm:"primaryKey;autoIncrement"`   //PK
	Category             string       `gorm:"type:varchar(100);not null"` //FK
	Name                 string       `gorm:"type:varchar(100);not null"`
	Description          string       `gorm:"type:varchar(350);not null"`
	ProfesorName         string       `gorm:"type:varchar(100);not null"`
	Quotas               int          `gorm:"not null"` //Cupos'
	Schedule             string       `gorm:"type:varchar(100);not null"`
	Active               bool         `gorm:"default:true"`
	InscriptionsActivity Inscriptions `gorm:"foreignKey:ActivityID"` //FK
	Photo                string       `gorm:"type:varchar(300);not null"`
}
type Activities []ActivityModel
