package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const (
	// TokenExpirationTime is the expiration time for the JWT token
	jwtDuration = 1 * time.Minute
	// TokenIssuer is the issuer of the JWT token
	jwtSecret = "jwtSecret"
)

// UserID associated with each token
func GenerateJWT(userID int) (string, error) {
	// set the expiration time
	expirationTime := time.Now().Add(jwtDuration)
	// create the JWT claims (los datos que viajan en el token. el mas importante es el user id)
	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(expirationTime), // set the expiration time
		IssuedAt:  jwt.NewNumericDate(time.Now()),     // set who issued the token
		NotBefore: jwt.NewNumericDate(time.Now()),     // set when the token is valid
		Issuer:    "backend",                          // set the issuer of the token
		Subject:   "auth",                             // set the subject of the token
		ID:        fmt.Sprintf("%d", userID),          // set the user ID as the subject of the token
	}

	// create the token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// sign the token with the secret key, ecrypted with SHA256
	tokenString, err := token.SignedString([]byte(jwtSecret))
	if err != nil {
		return "", fmt.Errorf("failed generating token: %w", err)
	}
	return tokenString, nil
}
