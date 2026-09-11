package errorx

import (
	"context"

	"github.com/ViitoJooj/noxacloud/pkg/ctxmod"
	"github.com/ViitoJooj/noxacloud/pkg/logs"
)

func Fatal(input error) {
	ctx := ctxmod.SetFunc(context.Background())
	logs.Fatal(ctx, input.Error())
}
