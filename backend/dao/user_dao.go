package dao

type User struct {
	ID           int             `gorm:"primaryKey"` //PK
	Email        string          `gorm:"unique"`
	PasswordHash string          `gorm:"password"`
	FirstName    string          `gorm:"type:varchar(100);not null"`
	LastName     string          `gorm:"type:varchar(100);not null"`
	Inscriptions InscriptionList `gorm:"foreignKey:UsuarioID"` //FK
}
