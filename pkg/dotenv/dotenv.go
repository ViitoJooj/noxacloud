package dotenv

import (
	"context"
	"errors"
	"fmt"
	"os"

	"github.com/ViitoJooj/noxacloud/pkg/ctxmod"
	"github.com/joho/godotenv"
)

type Cfg struct {
	Application Application
	PostgreSQL  PostgreSQL
	Stripe      Stripe
}

type Application struct {
	BackendURL  string
	FrontendURL string
}

type PostgreSQL struct {
	Uri string
}

type Stripe struct {
	SecretKey string
	PublicKey string
}

func NewDotenv(ctx context.Context) (*Cfg, error) {

	ctx = ctxmod.SetFunc(ctx)

	var output Cfg

	err := godotenv.Load("./.env")
	if err != nil {
		return nil, errors.New("Error on load .env, Verify path")
	}

	output = Cfg{
		Application: Application{
			BackendURL:  os.Getenv("APPLICATION_BACKEND"),
			FrontendURL: os.Getenv("APPLICATION_FRONTEND"),
		},
		PostgreSQL: PostgreSQL{
			Uri: os.Getenv("POSTGRES_URI"),
		},
		Stripe: Stripe{
			SecretKey: os.Getenv("STRIPE_SECRET_KEY"),
			PublicKey: os.Getenv("STRIPE_PUBLIC_KEY"),
		},
	}

	if err := validate(output); err != nil {
		return nil, err
	}

	return &output, nil
}

func validate(cfg Cfg) error {

	var erros []string

	if cfg.PostgreSQL.Uri == "" {
		erros = append(erros, "POSTGRES_URI")
	}

	if cfg.Stripe.SecretKey == "" {
		erros = append(erros, "STRIPE_SECRET_KEY")
	}

	if cfg.Stripe.SecretKey == "" {
		erros = append(erros, "STRIPE_PUBLIC_KEY")
	}

	return dotenvNullValue(erros)
}

func dotenvNullValue(inputs []string) error {

	if inputs != nil {
		message := fmt.Sprintf("missing vars:\n%v\n", inputs)
		return errors.New(message)
	}

	return nil
}
