import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';
import { authService } from './page';

describe('Login page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the form fields', () => {
		const { getByLabelText } = render(Page);
		expect(getByLabelText('E-mail')).toBeTruthy();
		expect(getByLabelText('Senha')).toBeTruthy();
	});

	it('shows validation errors and does not submit when fields are empty', async () => {
		const submitSpy = vi.spyOn(authService, 'login');
		const { getByRole, findAllByText } = render(Page);
		await fireEvent.click(getByRole('button', { name: 'Entrar' }));
		const errors = await findAllByText('Campo obrigatório');
		expect(errors.length).toBeGreaterThan(0);
		expect(submitSpy).not.toHaveBeenCalled();
		submitSpy.mockRestore();
	});

	it('submits and shows the success view when the form is valid', async () => {
		const { getByLabelText, getByRole, findByText } = render(Page);
		await fireEvent.input(getByLabelText('E-mail'), { target: { value: 'ana@example.com' } });
		await fireEvent.input(getByLabelText('Senha'), { target: { value: 'segredo123' } });
		await fireEvent.click(getByRole('button', { name: 'Entrar' }));
		expect(await findByText('Você entrou')).toBeTruthy();
	});

	it('links to the register page', () => {
		const { getByText } = render(Page);
		expect(getByText('Registre-se').closest('a')?.getAttribute('href')).toBe('/register');
	});
});
