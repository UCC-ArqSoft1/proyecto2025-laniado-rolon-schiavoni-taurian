package services

import (
	inscriptionClient "backend/clients/inscription"
	"backend/dto"
	"backend/model"
	"time"
)

func Inscription(user_id int, activity_id int) error {
	inscription := dto.InscriptionDto{
		UserID:          user_id,
		ActivityID:      activity_id,
		DateInscription: time.Now().Format("2006-01-02"),
		Active:          true,
	}

	inscriptionModel := model.InscriptionModel{
		UserID:          inscription.UserID,
		ActivityID:      inscription.ActivityID,
		DateInscription: inscription.DateInscription,
		Active:          inscription.Active,
	}

	err := inscriptionClient.CreateInscription(inscriptionModel)
	if err != nil {
		return err
	}
	return nil
}
