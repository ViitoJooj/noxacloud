package ctxmod

import (
	"context"
	"runtime"
)

type ctxKey struct{}

var functionNameKey = ctxKey{}

func SetFunc(ctx context.Context) context.Context {
	pc, _, _, ok := runtime.Caller(1)
	if !ok {
		return context.WithValue(ctx, functionNameKey, "unknown")
	}

	fnDetails := runtime.FuncForPC(pc)
	if fnDetails == nil {
		return context.WithValue(ctx, functionNameKey, "unknown")
	}

	return context.WithValue(ctx, functionNameKey, fnDetails.Name())
}

func GetFunc(ctx context.Context) string {
	if fnName, ok := ctx.Value(functionNameKey).(string); ok {
		return fnName
	}
	return "unknown"
}
