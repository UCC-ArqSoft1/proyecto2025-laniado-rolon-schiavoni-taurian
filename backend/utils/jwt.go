package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

const (
	// TokenExpirationTime is the expiration time for the JWT token
	jwtDuration = 10 * time.Minute
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

// ValidateJWT validates the JWT token and returns the user ID
func ValidateJWT(tokenString string) error {
	// parse the token
	token, err := jwt.ParseWithClaims(tokenString, &jwt.RegisteredClaims{}, func(token *jwt.Token) (interface{}, error) {
		// check if the signing method is valid
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(jwtSecret), nil
	})

	if err != nil {
		return fmt.Errorf("failed parsing token: %w", err)
	}

	// check if the token is valid
	claims, ok := token.Claims.(*jwt.RegisteredClaims)

	if ok {

		if claims.ExpiresAt != nil && claims.ExpiresAt.Before(time.Now()) {
			return fmt.Errorf("token expired at %v", claims.ExpiresAt.Time)
		}
		return nil
	}

	return fmt.Errorf("invalid token")
}
