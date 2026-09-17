import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';
import { contactService } from './page';

describe('Contact page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders every form field', () => {
		const { getByLabelText } = render(Page);
		expect(getByLabelText('Nome')).toBeTruthy();
		expect(getByLabelText('Sobrenome')).toBeTruthy();
		expect(getByLabelText('E-mail')).toBeTruthy();
		expect(getByLabelText('Telefone / WhatsApp')).toBeTruthy();
		expect(getByLabelText('Tipo de suporte')).toBeTruthy();
		expect(getByLabelText('Mensagem')).toBeTruthy();
	});

	it('shows validation errors and does not submit when required fields are empty', async () => {
		const submitSpy = vi.spyOn(contactService, 'submit');
		const { getByText, findAllByText } = render(Page);
		await fireEvent.click(getByText('Enviar mensagem'));
		const errors = await findAllByText('Campo obrigatório');
		expect(errors.length).toBeGreaterThan(0);
		expect(submitSpy).not.toHaveBeenCalled();
		submitSpy.mockRestore();
	});

	it('submits and shows the success view when the form is valid', async () => {
		const { getByLabelText, getByText, findByText } = render(Page);
		await fireEvent.input(getByLabelText('Nome'), { target: { value: 'Ana' } });
		await fireEvent.input(getByLabelText('Sobrenome'), { target: { value: 'Silva' } });
		await fireEvent.input(getByLabelText('E-mail'), { target: { value: 'ana@example.com' } });
		await fireEvent.change(getByLabelText('Tipo de suporte'), { target: { value: 'comercial' } });
		await fireEvent.input(getByLabelText('Mensagem'), { target: { value: 'Quero um orçamento' } });
		await fireEvent.click(getByText('Enviar mensagem'));
		expect(await findByText('Mensagem enviada')).toBeTruthy();
	});
});
