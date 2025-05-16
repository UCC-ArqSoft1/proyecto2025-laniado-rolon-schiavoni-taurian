package model

type InscriptionModel struct {
	ID              int `gorm:"primaryKey"` //PK
	UsuarioID       int
	User            UserModel `gorm:"foreignKey:UsuarioID"` //FK
	ActivityID      int
	Activity        ActivityModel `gorm:"foreignKey:ActividadID"` //FK
	DateInscription string        `gorm:"type:date;not null"`     //Date of inscription
	Active          bool          `gorm:"default:true"`           //Active status
}

type Inscriptions []InscriptionModel
