package dto

type UserDto struct {
	ID               int          `json:"id"`
	Email            string       `json:"username"`
	Password         string       `json:"password"`
	FirstName        string       `json:"first_name"`
	LastName         string       `json:"last_name"`
	InscriptionsUser Inscriptions `json:"inscriptions"` //FK
}
