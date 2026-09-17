import { i18n } from '$lib/i18n/store.svelte';

export interface ProfileFormState {
	nome: string;
	email: string;
	telefone: string;
	negocio: string;
	cnpj: string;
}

export type ProfileErrors = Partial<Record<keyof ProfileFormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProfileForm(form: ProfileFormState): ProfileErrors {
	const errors: ProfileErrors = {};
	if (!form.nome.trim()) errors.nome = i18n.t('auth.validation.required');
	if (!form.email.trim()) errors.email = i18n.t('auth.validation.required');
	else if (!EMAIL_RE.test(form.email)) errors.email = i18n.t('auth.validation.invalidEmail');
	return errors;
}

export function initialProfileForm(): ProfileFormState {
	return {
		nome: 'Ana Souza',
		email: 'ana@saborcaseiro.com.br',
		telefone: '(11) 98888-7766',
		negocio: 'Restaurante Sabor Caseiro',
		cnpj: '12.345.678/0001-90'
	};
}

export interface PasswordFormState {
	password: string;
	confirmPassword: string;
}

export type PasswordErrors = Partial<Record<keyof PasswordFormState, string>>;

export function validatePasswordForm(form: PasswordFormState): PasswordErrors {
	const errors: PasswordErrors = {};
	if (!form.password.trim()) errors.password = i18n.t('auth.validation.required');
	if (!form.confirmPassword.trim()) errors.confirmPassword = i18n.t('auth.validation.required');
	else if (form.password !== form.confirmPassword) {
		errors.confirmPassword = i18n.t('auth.validation.passwordMismatch');
	}
	return errors;
}

export function emptyPasswordForm(): PasswordFormState {
	return { password: '', confirmPassword: '' };
}
