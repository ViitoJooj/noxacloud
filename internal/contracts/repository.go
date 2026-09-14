package contracts

import (
	"context"
	"uuid"
)

type IRepository[Manifest any, Status any] interface {
	Save(ctx context.Context, input Manifest) (Status, error)
	GetByID(ctx context.Context, id *uuid.UUID) (Status, error)
	List(ctx context.Context) ([]Status, error)
	Exists(ctx context.Context, input Manifest) (bool, error)
	Update(ctx context.Context, id *uuid.UUID, input Manifest) (Status, error)
	Delete(ctx context.Context, id *uuid.UUID) error
}

type IRepositoryAuth[Manifest any, Status any] interface {
	GetByEmail(ctx context.Context, email string) (Status, error)
	ExistsByEmail(ctx context.Context, email string) (bool, error)
}
