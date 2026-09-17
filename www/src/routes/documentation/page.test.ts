import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Documentation page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the hero title', () => {
		const { getByText } = render(Page);
		expect(getByText('API Noxacloud')).toBeTruthy();
	});

	it('defaults to the public tier and shows only its endpoints', () => {
		const { getByText, queryByText } = render(Page);
		expect(getByText('/v1/estabelecimento')).toBeTruthy();
		expect(queryByText('/v1/pedidos')).toBeNull();
	});

	it('switches to the client tier and shows its endpoints', async () => {
		const { getByText, findAllByText } = render(Page);
		await fireEvent.click(getByText('Cliente'));
		const matches = await findAllByText('/v1/pedidos');
		expect(matches.length).toBeGreaterThan(0);
	});

	it('selects an endpoint and shows its detail, including params and responses', async () => {
		const { getByText, findAllByText } = render(Page);
		await fireEvent.click(getByText('Cliente'));
		const [getPedidosNavItem] = await findAllByText('/v1/pedidos');
		await fireEvent.click(getPedidosNavItem);
		expect(await findAllByText('Lista pedidos do estabelecimento, com filtro por status e data')).toHaveLength(1);
		expect(getByText('status')).toBeTruthy();
		expect(getByText('Lista de pedidos retornada')).toBeTruthy();
	});

	it('renders in English when locale is en', () => {
		i18n.setLocale('en');
		const { getByText } = render(Page);
		expect(getByText('API Noxacloud')).toBeTruthy();
		expect(getByText('/v1/estabelecimento')).toBeTruthy();
	});
});
