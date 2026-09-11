package contracts

type IUseCase[I any, O any] interface {
	Perform(input I) (O, error)
}
