import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Home page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the hero title and CTA buttons', () => {
		const { getByText, getAllByText } = render(Page);
		expect(getByText('Infraestrutura completa para o seu negócio.')).toBeTruthy();
		expect(getAllByText('Simular orçamento').length).toBeGreaterThan(0);
		expect(getAllByText('Falar com a gente').length).toBeGreaterThan(0);
	});

	it('renders the business type grid linking to /prices', () => {
		const { getByText } = render(Page);
		const link = getByText('Restaurante').closest('a');
		expect(link?.getAttribute('href')).toBe('/prices');
	});

	it('renders all three pillars and all five steps', () => {
		const { getByText } = render(Page);
		expect(getByText('Aplicação sob medida')).toBeTruthy();
		expect(getByText('Infraestrutura gerenciada')).toBeTruthy();
		expect(getByText('Painel do cliente')).toBeTruthy();
		expect(getByText('Diagnóstico')).toBeTruthy();
		expect(getByText('Manutenção')).toBeTruthy();
	});

	it('renders the comparison table with named competitors and the Noxacloud column highlighted', () => {
		const { getByText, getAllByText } = render(Page);
		expect(getByText('Custo por venda')).toBeTruthy();
		expect(getByText('Nenhum, mensalidade fixa')).toBeTruthy();
		expect(getAllByText('Shopify').length).toBeGreaterThan(0);
		expect(getByText('Wix')).toBeTruthy();
		expect(getByText('WooCommerce')).toBeTruthy();
		expect(getByText('Integração com CRM')).toBeTruthy();
		expect(getByText('Envio de e-mails')).toBeTruthy();
	});

	it('renders all 4 contract guarantees', () => {
		const { getByText } = render(Page);
		expect(getByText('Prazo com consequência')).toBeTruthy();
		expect(getByText('Os dados são seus')).toBeTruthy();
		expect(getByText('Saída sem sequestro')).toBeTruthy();
		expect(getByText('Segurança e backup')).toBeTruthy();
	});

	it('toggles a FAQ item open and closed', async () => {
		const { getByText, queryByText } = render(Page);
		expect(queryByText(/Nós cuidamos de servidor/)).toBeNull();
		await fireEvent.click(getByText('Preciso de equipe técnica para usar?'));
		expect(getByText(/cuidamos de servidor/)).toBeTruthy();
		await fireEvent.click(getByText('Preciso de equipe técnica para usar?'));
		expect(queryByText(/cuidamos de servidor/)).toBeNull();
	});

	it('renders in English when locale is en', () => {
		i18n.setLocale('en');
		const { getByText } = render(Page);
		expect(getByText('Complete infrastructure for your business.')).toBeTruthy();
		expect(getByText('Restaurant')).toBeTruthy();
	});
});
