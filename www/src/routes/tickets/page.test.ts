import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Tickets page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders existing tickets in the table', () => {
		const { getByText } = render(Page);
		expect(getByText('Erro ao carregar catálogo de produtos')).toBeTruthy();
		expect(getByText('Ajustar cor do botão de finalizar pedido')).toBeTruthy();
		expect(getByText('Dúvida sobre emissão de nota fiscal')).toBeTruthy();
	});

	it('opens the dialog and creates a new ticket on submit', async () => {
		const { getByRole, getByLabelText, findByText, queryByRole } = render(Page);
		await fireEvent.click(getByRole('button', { name: 'Abrir chamado' }));
		await fireEvent.input(getByLabelText('Título'), { target: { value: 'Testar novo chamado' } });
		await fireEvent.click(getByRole('button', { name: 'Enviar chamado' }));
		expect(await findByText('Testar novo chamado')).toBeTruthy();
		expect(queryByRole('dialog')).toBeNull();
	});

	it('closes the dialog on cancel without creating a ticket', async () => {
		const { getByRole, queryByRole } = render(Page);
		await fireEvent.click(getByRole('button', { name: 'Abrir chamado' }));
		await fireEvent.click(getByRole('button', { name: 'Cancelar' }));
		expect(queryByRole('dialog')).toBeNull();
	});
});
