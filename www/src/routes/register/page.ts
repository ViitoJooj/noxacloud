import { i18n } from '$lib/i18n/store.svelte';
import { AuthService, type RegisterPayload } from '$lib/auth/authService';

export interface RegisterFormState {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export type RegisterErrors = Partial<Record<keyof RegisterFormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateRegisterForm(form: RegisterFormState): RegisterErrors {
	const errors: RegisterErrors = {};
	if (!form.name.trim()) errors.name = i18n.t('auth.validation.required');
	if (!form.email.trim()) errors.email = i18n.t('auth.validation.required');
	else if (!EMAIL_RE.test(form.email)) errors.email = i18n.t('auth.validation.invalidEmail');
	if (!form.password.trim()) errors.password = i18n.t('auth.validation.required');
	if (!form.confirmPassword.trim()) errors.confirmPassword = i18n.t('auth.validation.required');
	else if (form.password !== form.confirmPassword) {
		errors.confirmPassword = i18n.t('auth.validation.passwordMismatch');
	}
	return errors;
}

export function emptyRegisterForm(): RegisterFormState {
	return { name: '', email: '', password: '', confirmPassword: '' };
}

export function toRegisterPayload(form: RegisterFormState): RegisterPayload {
	return { name: form.name, email: form.email, password: form.password };
}

export const authService = new AuthService();
