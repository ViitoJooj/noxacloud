package logs

import (
	"context"
	"io"
	"log"
	"os"
	"strings"

	"github.com/ViitoJooj/noxacloud/pkg/ctxmod"
)

const (
	logFile     = "logs.txt"
	maxLogLines = 1000
)

func init() {
	w, err := newRotatingWriter(logFile, maxLogLines)
	if err != nil {
		log.Fatalf("[FATAL] [logs.init] %s", err.Error())
	}
	log.SetOutput(io.MultiWriter(os.Stdout, w))
}

func oneLine(msg string) string {
	msg = strings.ReplaceAll(msg, "\r\n", " ")
	return strings.ReplaceAll(msg, "\n", " ")
}

func Info(ctx context.Context, msg string) {
	fn := ctxmod.GetFunc(ctx)
	log.Printf("[INFO] [%s] %s", fn, oneLine(msg))
}

func Error(ctx context.Context, msg string) {
	fn := ctxmod.GetFunc(ctx)
	log.Printf("[ERROR] [%s] %s", fn, oneLine(msg))
}

func Fatal(ctx context.Context, msg string) {
	fn := ctxmod.GetFunc(ctx)
	log.Fatalf("[FATAL] [%s] %s", fn, oneLine(msg))
}
