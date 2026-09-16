package main

import (
	"context"

	"github.com/ViitoJooj/noxacloud/internal/containers/users"
	"github.com/ViitoJooj/noxacloud/internal/workers"
	"github.com/ViitoJooj/noxacloud/pkg/dotenv"
	"github.com/ViitoJooj/noxacloud/pkg/errorx"
	"github.com/ViitoJooj/noxacloud/pkg/httpx"
	"github.com/ViitoJooj/noxacloud/pkg/migration"
	"github.com/ViitoJooj/noxacloud/pkg/postgres"
	"github.com/gin-gonic/gin"
)

func main() {

	ctx, cancel := context.WithCancel(context.Background())
	server := gin.Default()
	server.Use(httpx.ErrorHandler())

	defer cancel()

	cfg, err := dotenv.NewDotenv(ctx)
	if err != nil {
		errorx.Fatal(err)
	}

	db, err := postgres.NewPostgresConn(ctx, cfg.PostgreSQL)
	if err != nil {
		errorx.Fatal(err)
	}

	err = migration.Migrate(ctx, db)
	if err != nil {
		errorx.Fatal(err)
	}

	workers.Exec(ctx, db)

	if err := users.Init(ctx, server, db); err != nil {
		errorx.Fatal(err)
	}

	if err := server.Run(":8080"); err != nil {
		errorx.Fatal(err)
	}
}
