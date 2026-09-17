import { i18n } from '$lib/i18n/store.svelte';
import { ContactService, type ContactFormPayload } from '$lib/contact/contactService';
import type { FieldOption } from '$lib/components/field/+page';

export interface ContactFormState {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	supportType: string;
	message: string;
}

export type ContactErrors = Partial<Record<keyof ContactFormState, string>>;

const SUPPORT_TYPE_KEYS = [
	'comercial',
	'suporteTecnico',
	'financeiro',
	'cobranca',
	'cancelamento',
	'parcerias',
	'trabalheConosco',
	'bugBounty',
	'imprensa',
	'outro'
] as const;

export function supportTypeOptions(): FieldOption[] {
	return SUPPORT_TYPE_KEYS.map((key) => ({
		value: key,
		label: i18n.t(`contact.supportTypes.${key}`)
	}));
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactForm(form: ContactFormState): ContactErrors {
	const errors: ContactErrors = {};
	if (!form.firstName.trim()) errors.firstName = i18n.t('contact.validation.required');
	if (!form.lastName.trim()) errors.lastName = i18n.t('contact.validation.required');
	if (!form.email.trim()) errors.email = i18n.t('contact.validation.required');
	else if (!EMAIL_RE.test(form.email)) errors.email = i18n.t('contact.validation.invalidEmail');
	if (!form.supportType.trim()) errors.supportType = i18n.t('contact.validation.required');
	if (!form.message.trim()) errors.message = i18n.t('contact.validation.required');
	return errors;
}

export function emptyContactForm(): ContactFormState {
	return { firstName: '', lastName: '', email: '', phone: '', supportType: '', message: '' };
}

export function toPayload(form: ContactFormState): ContactFormPayload {
	return { ...form };
}

export const contactService = new ContactService();
