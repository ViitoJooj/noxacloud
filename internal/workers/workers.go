// Package workers runs a set of contracts.IWorker on their own ticker, each in its own goroutine.
package workers

import (
	"context"
	"fmt"
	"time"

	"github.com/ViitoJooj/noxacloud/internal/contracts"
	"github.com/ViitoJooj/noxacloud/pkg/ctxmod"
	"github.com/ViitoJooj/noxacloud/pkg/logs"
)

type Manager struct {
	workers []contracts.IWorker
}

// New builds a Manager ready to Start. Usage:
//
//	workers.New(
//		dbcleanup.NewActionConfirmCleaner(pgdb),
//		dbcleanup.NewOldUsersCleaner(pgdb),
//		serverstatus.NewReporter(pgdb, rdb),
//	).Start(ctx)
func New(workers ...contracts.IWorker) *Manager {
	return &Manager{workers: workers}
}

func (m *Manager) Start(ctx context.Context) {
	for _, w := range m.workers {
		go m.run(ctx, w)
	}
}

func (m *Manager) run(ctx context.Context, w contracts.IWorker) {
	ctx = ctxmod.SetFunc(ctx)

	m.exec(ctx, w)

	ticker := time.NewTicker(w.Interval())
	defer ticker.Stop()

	for {
		select {
		case <-ticker.C:
			m.exec(ctx, w)
		case <-ctx.Done():
			return
		}
	}
}

func (m *Manager) exec(ctx context.Context, w contracts.IWorker) {
	if err := w.Run(ctx); err != nil {
		logs.Error(ctx, fmt.Sprintf("%s: %s", w.Name(), err.Error()))
	}
}
