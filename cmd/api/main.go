package main

import (
	"context"

	"github.com/ViitoJooj/noxacloud/internal/containers/users"
	"github.com/ViitoJooj/noxacloud/pkg/dotenv"
	"github.com/ViitoJooj/noxacloud/pkg/errorx"
	"github.com/ViitoJooj/noxacloud/pkg/migration"
	"github.com/ViitoJooj/noxacloud/pkg/postgres"
	"github.com/gin-gonic/gin"
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

	err = migration.Migrate(ctx, conn)
	if err != nil {
		errorx.Fatal(err)
	}

	router := gin.Default()
	users.Container(conn, router)

	addr := cfg.Application.BackHost + ":" + cfg.Application.BackPort
	if err := router.Run(addr); err != nil {
		errorx.Fatal(err)
	}
}
