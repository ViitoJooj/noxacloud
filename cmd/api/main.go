package main

import (
	"context"
	"time"

	"github.com/ViitoJooj/noxacloud/internal/containers/server"
	"github.com/ViitoJooj/noxacloud/internal/containers/users"
	"github.com/ViitoJooj/noxacloud/internal/contracts"
	"github.com/ViitoJooj/noxacloud/internal/workers"
	"github.com/ViitoJooj/noxacloud/internal/workers/dbcleanup"
	"github.com/ViitoJooj/noxacloud/internal/workers/serverstatus"
	"github.com/ViitoJooj/noxacloud/pkg/dotenv"
	"github.com/ViitoJooj/noxacloud/pkg/errorx"
	"github.com/ViitoJooj/noxacloud/pkg/httpx"
	"github.com/ViitoJooj/noxacloud/pkg/migration"
	"github.com/ViitoJooj/noxacloud/pkg/postgres"
	"github.com/ViitoJooj/noxacloud/pkg/redis"
	"github.com/gin-gonic/gin"
	ginprometheus "github.com/zsais/go-gin-prometheus"
)

func main() {

	ctx, cancel := context.WithCancel(context.Background())
	prometheus := ginprometheus.NewWithConfig(ginprometheus.Config{Subsystem: "gin"})
	api := gin.Default()

	api.Use(httpx.ErrorHandler())
	prometheus.Use(api)

	defer cancel()

	cfg, err := dotenv.NewDotenv(ctx)
	if err != nil {
		errorx.Fatal(err)
	}

	pgdb, err := postgres.NewPostgresConn(ctx, cfg.PostgreSQL)
	if err != nil {
		errorx.Fatal(err)
	}

	rdb, err := redis.NewRedisConn(ctx, cfg.Redis)
	if err != nil {
		errorx.Fatal(err)
	}

	err = migration.Migrate(ctx, pgdb)
	if err != nil {
		errorx.Fatal(err)
	}

	workers.New(
		dbcleanup.NewActionConfirmCleaner(pgdb, contracts.WithInterval(12*time.Hour)),
		dbcleanup.NewOldUsersCleaner(pgdb, contracts.WithInterval(24*time.Hour)),
		serverstatus.NewReporter(pgdb, rdb, contracts.WithInterval(5*time.Minute)),
	).Start(ctx)

	if err := users.Init(ctx, api, pgdb); err != nil {
		errorx.Fatal(err)
	}
	if err := server.Init(ctx, api, pgdb); err != nil {
		errorx.Fatal(err)
	}

	if err := api.Run(":8080"); err != nil {
		errorx.Fatal(err)
	}
}
