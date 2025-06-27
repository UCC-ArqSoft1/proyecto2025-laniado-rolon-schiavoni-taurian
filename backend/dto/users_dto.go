package dto

type UserDto struct {
	ID               int          `json:"id"`
	Email            string       `json:"email"`
	Password         string       `json:"password"`
	FirstName        string       `json:"first_name"`
	LastName         string       `json:"last_name"`
	InscriptionsUser Inscriptions `json:"inscriptions"` //FK
	IsAdmin          bool         `json:"is_admin"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token   string `json:"token"`
	Name    string `json:"name"`
	Surname string `json:"surname"`
	IsAdmin bool   `json:"is_admin"`
}
