package domain

type Inscription struct {
	ID               int    `json:"id"`                //PK
	UsuarioID        int    `json:"usuario_id"`        //FK
	ActividadID      int    `json:"actividad_id"`      //FK
	FechaInscripcion string `json:"fecha_inscripcion"` //Date of inscription
}

type InscriptionList []Inscription
