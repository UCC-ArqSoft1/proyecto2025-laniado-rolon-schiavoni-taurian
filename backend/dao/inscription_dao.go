package dao

type Inscription struct {
	ID               int `gorm:"primaryKey"` //PK
	UsuarioID        int
	ActividadID      int
	FechaInscripcion string `gorm:"type:date;not null"` //Date of inscription
}

type InscriptionList []Inscription
