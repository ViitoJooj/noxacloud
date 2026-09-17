import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Projects page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders every server as a card', () => {
		const { getByText } = render(Page);
		expect(getByText('App do Restaurante Sabor Caseiro')).toBeTruthy();
		expect(getByText('Banco de dados do Restaurante Sabor Caseiro')).toBeTruthy();
		expect(getByText('App da Barbearia Estilo')).toBeTruthy();
	});

	it('opens the detail panel when a card is selected and closes it again', async () => {
		const { getByText, getByLabelText, queryByText } = render(Page);
		await fireEvent.click(getByText('App do Restaurante Sabor Caseiro'));
		expect(getByText('Frontend + Backend (SvelteKit/Golang) · Projeto: Restaurante Sabor Caseiro')).toBeTruthy();
		await fireEvent.click(getByLabelText('Fechar'));
		expect(queryByText('Frontend + Backend (SvelteKit/Golang) · Projeto: Restaurante Sabor Caseiro')).toBeNull();
	});

	it('pauses a running server from the detail panel', async () => {
		const { getByText, getAllByText } = render(Page);
		await fireEvent.click(getByText('App do Restaurante Sabor Caseiro'));
		await fireEvent.click(getByText('Pausar'));
		expect(getAllByText('Pausado').length).toBeGreaterThan(0);
	});
});
