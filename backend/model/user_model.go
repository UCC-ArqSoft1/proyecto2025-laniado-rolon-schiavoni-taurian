package model

type UserModel struct {
	ID               int          `gorm:"primaryKey"`                        //PK
	Email            string       `gorm:"unique;not null;type:varchar(100)"` //Unique email
	PasswordHash     string       `gorm:"password"`
	FirstName        string       `gorm:"type:varchar(100);not null"`
	LastName         string       `gorm:"type:varchar(100);not null"`
	InscriptionsUser Inscriptions `gorm:"foreignKey:UserID"` //FK
	IsAdmin          bool         `gorm:"default:false"`     //Admin
}
