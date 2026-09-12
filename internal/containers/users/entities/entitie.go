package entities

import (
	"errors"
	"time"
	"uuid"

	"github.com/ViitoJooj/go-sdk/validate"
)

type Role string

const (
	AdminRole Role = "admin"
	UserRole  Role = "user"
)

type User struct {
	ID        uuid.UUID
	Name      string
	Email     *string
	Phone     *string
	CPF       *string
	CNPJ      *string
	Password  string
	Role      Role
	UpdatedAt time.Time
	CreatedAt time.Time
	DeletedAt *time.Time
}

func NewUser(name string, email, phone, cpf, cnpj *string, password string) (*User, error) {

	if email == nil || phone == nil || cpf == nil || cnpj == nil {
		return nil, errors.New("Invalid input.")
	}

	if err := validate.FullName(name); err != nil {
		return nil, err
	}

	if err := validate.Email(*email); err != nil {
		return nil, err
	}

	if err := validate.Phone(*phone); err != nil {
		return nil, err
	}

	if err := validate.CPF(*cpf); err != nil {
		return nil, err
	}

	if err := validate.CNPJ(*cnpj); err != nil {
		return nil, err
	}

	if err := validate.Password(password); err != nil {
		return nil, err
	}

	return &User{
		ID:        uuid.Nil(),
		Name:      name,
		Email:     email,
		Phone:     phone,
		CPF:       cpf,
		CNPJ:      cnpj,
		Password:  password,
		Role:      "user",
		UpdatedAt: time.Now(),
		CreatedAt: time.Now(),
		DeletedAt: nil,
	}, nil

}

func (u *User) GetUserID() uuid.UUID {
	return u.ID
}

func (u *User) GetUserName() string {
	return u.Name
}

func (u *User) GetUserEmail() string {
	return *u.Email
}

func (u *User) GetUserPhone() string {
	return *u.Phone
}

func (u *User) GetUserCPF() string {
	return *u.CPF
}

func (u *User) GetUserCNPJ() string {
	return *u.CNPJ
}

func (u *User) GetUserRole() Role {
	return u.Role
}

func (u *User) GetUserUpdatedAt() time.Time {
	return u.UpdatedAt
}

func (u *User) GetUserCreatedAt() time.Time {
	return u.CreatedAt
}

func (u *User) GetUserDeletedAt() time.Time {
	return *u.DeletedAt
}
