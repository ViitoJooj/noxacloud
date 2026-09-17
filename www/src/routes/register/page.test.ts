import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';
import { authService } from './page';

describe('Register page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the form fields', () => {
		const { getByLabelText } = render(Page);
		expect(getByLabelText('Seu nome')).toBeTruthy();
		expect(getByLabelText('E-mail')).toBeTruthy();
		expect(getByLabelText('Senha')).toBeTruthy();
		expect(getByLabelText('Confirmar senha')).toBeTruthy();
	});

	it('shows validation errors and does not submit when fields are empty', async () => {
		const submitSpy = vi.spyOn(authService, 'register');
		const { getByRole, findAllByText } = render(Page);
		await fireEvent.click(getByRole('button', { name: 'Continuar' }));
		const errors = await findAllByText('Campo obrigatório');
		expect(errors.length).toBeGreaterThan(0);
		expect(submitSpy).not.toHaveBeenCalled();
		submitSpy.mockRestore();
	});

	it('shows a password-mismatch error and does not submit when passwords differ', async () => {
		const submitSpy = vi.spyOn(authService, 'register');
		const { getByLabelText, getByRole, findByText } = render(Page);
		await fireEvent.input(getByLabelText('Seu nome'), { target: { value: 'Ana Silva' } });
		await fireEvent.input(getByLabelText('E-mail'), { target: { value: 'ana@example.com' } });
		await fireEvent.input(getByLabelText('Senha'), { target: { value: 'segredo123' } });
		await fireEvent.input(getByLabelText('Confirmar senha'), { target: { value: 'outrasenha' } });
		await fireEvent.click(getByRole('button', { name: 'Continuar' }));
		expect(await findByText('As senhas não coincidem.')).toBeTruthy();
		expect(submitSpy).not.toHaveBeenCalled();
		submitSpy.mockRestore();
	});

	it('submits and shows the success view when the form is valid', async () => {
		const { getByLabelText, getByRole, findByText } = render(Page);
		await fireEvent.input(getByLabelText('Seu nome'), { target: { value: 'Ana Silva' } });
		await fireEvent.input(getByLabelText('E-mail'), { target: { value: 'ana@example.com' } });
		await fireEvent.input(getByLabelText('Senha'), { target: { value: 'segredo123' } });
		await fireEvent.input(getByLabelText('Confirmar senha'), { target: { value: 'segredo123' } });
		await fireEvent.click(getByRole('button', { name: 'Continuar' }));
		expect(await findByText('Conta criada')).toBeTruthy();
	});

	it('links to the login page', () => {
		const { getByText } = render(Page);
		expect(getByText('Entrar').closest('a')?.getAttribute('href')).toBe('/login');
	});
});
