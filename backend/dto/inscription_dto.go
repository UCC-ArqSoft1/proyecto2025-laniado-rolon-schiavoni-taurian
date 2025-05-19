package dto

type InscriptionDto struct {
	ID              int    `json:"id"`                //PK
	UserID          int    `json:"usuario_id"`        //FK
	ActivityID      int    `json:"actividad_id"`      //FK
	DateInscription string `json:"fecha_inscripcion"` //Date of inscription
	Active          bool   `json:"active"`            //Active status
}

type Inscriptions []InscriptionDto

type InscriptionRequest struct {
	UserID     int `json:"usuario_id"`
	ActivityID int `json:"actividad_id"`
}
