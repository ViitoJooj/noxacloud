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
	BackHost  string
	BackPort  string
	FrontHost string
	FrontPort string
}

type PostgreSQL struct {
	Uri string
}

type Stripe struct {
	ApiKey string
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
			BackHost:  os.Getenv("APPLICATION_BACK_HOST"),
			BackPort:  os.Getenv("APPLICATION_BACK_PORT"),
			FrontHost: os.Getenv("APPLICATION_FRONT_HOST"),
			FrontPort: os.Getenv("APPLICATION_FRONT_PORT"),
		},
		PostgreSQL: PostgreSQL{
			Uri: os.Getenv("POSTGRES_URI"),
		},
		Stripe: Stripe{
			ApiKey: os.Getenv("STRIPE_API_KEY"),
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

	if cfg.Stripe.ApiKey == "" {
		erros = append(erros, "STRIPE_API_KEY")
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
