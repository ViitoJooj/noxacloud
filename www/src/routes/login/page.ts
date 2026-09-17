import { i18n } from '$lib/i18n/store.svelte';
import { AuthService, type LoginPayload } from '$lib/auth/authService';

export interface LoginFormState {
	email: string;
	password: string;
}

export type LoginErrors = Partial<Record<keyof LoginFormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(form: LoginFormState): LoginErrors {
	const errors: LoginErrors = {};
	if (!form.email.trim()) errors.email = i18n.t('auth.validation.required');
	else if (!EMAIL_RE.test(form.email)) errors.email = i18n.t('auth.validation.invalidEmail');
	if (!form.password.trim()) errors.password = i18n.t('auth.validation.required');
	return errors;
}

export function emptyLoginForm(): LoginFormState {
	return { email: '', password: '' };
}

export function toLoginPayload(form: LoginFormState): LoginPayload {
	return { ...form };
}

export const authService = new AuthService();
