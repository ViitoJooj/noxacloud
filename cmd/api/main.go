package main

import (
	"context"

	"github.com/ViitoJooj/noxacloud/pkg/dotenv"
	"github.com/ViitoJooj/noxacloud/pkg/errorx"
	"github.com/ViitoJooj/noxacloud/pkg/postgres"
)

func main() {

	ctx := context.Background()

	cfg, err := dotenv.NewDotenv(ctx)
	if err != nil {
		errorx.Fatal(err)
	}

	conn, err := postgres.NewPostgresConn(ctx, cfg.PostgreSQL)
	if err != nil {
		errorx.Fatal(err)
	}

	conn.Ping()
}
