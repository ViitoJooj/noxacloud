import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Profile page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders profile and password fields prefilled', () => {
		const { getByLabelText } = render(Page);
		expect((getByLabelText('Nome') as HTMLInputElement).value).toBe('Ana Souza');
		expect((getByLabelText('E-mail') as HTMLInputElement).value).toBe('ana@saborcaseiro.com.br');
		expect(getByLabelText('Nova senha')).toBeTruthy();
		expect(getByLabelText('Confirmar nova senha')).toBeTruthy();
	});

	it('shows a saved tag after saving valid profile data', async () => {
		const { getByRole, findByText } = render(Page);
		await fireEvent.click(getByRole('button', { name: 'Salvar alterações' }));
		expect(await findByText('Salvo')).toBeTruthy();
	});

	it('blocks saving when required fields are empty', async () => {
		const { getByLabelText, getByRole, findAllByText } = render(Page);
		await fireEvent.input(getByLabelText('Nome'), { target: { value: '' } });
		await fireEvent.click(getByRole('button', { name: 'Salvar alterações' }));
		const errors = await findAllByText('Campo obrigatório');
		expect(errors.length).toBeGreaterThan(0);
	});

	it('shows a password-mismatch error when passwords differ', async () => {
		const { getByLabelText, getByRole, findByText } = render(Page);
		await fireEvent.input(getByLabelText('Nova senha'), { target: { value: 'segredo123' } });
		await fireEvent.input(getByLabelText('Confirmar nova senha'), { target: { value: 'outrasenha' } });
		await fireEvent.click(getByRole('button', { name: 'Alterar senha' }));
		expect(await findByText('As senhas não coincidem.')).toBeTruthy();
	});
});
