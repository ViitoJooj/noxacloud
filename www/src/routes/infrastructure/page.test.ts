import { afterEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Infrastructure page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the hero title', () => {
		const { getByText } = render(Page);
		expect(getByText('Como a Noxacloud constrói e mantém seu sistema')).toBeTruthy();
	});

	it('renders every request-flow step', () => {
		const { getByText } = render(Page);
		expect(getByText('URL')).toBeTruthy();
		expect(getByText('Roteamento')).toBeTruthy();
		expect(getByText('Validação')).toBeTruthy();
	});

	it('renders all 6 managed-infrastructure cards', () => {
		const { getByText } = render(Page);
		expect(getByText('Ambientes isolados')).toBeTruthy();
		expect(getByText('Monitoramento')).toBeTruthy();
		expect(getByText('Autenticação')).toBeTruthy();
		expect(getByText('URL própria')).toBeTruthy();
		expect(getByText('Visualização em Grafana')).toBeTruthy();
		expect(getByText('Backups automáticos')).toBeTruthy();
	});

	it('renders the dev stack table with every row', () => {
		const { getByText } = render(Page);
		expect(getByText('Camada')).toBeTruthy();
		expect(getByText('SvelteKit')).toBeTruthy();
		expect(getByText('PostgreSQL')).toBeTruthy();
		expect(getByText('AWS, Azure ou Oracle')).toBeTruthy();
	});

	it('renders in English when locale is en', () => {
		i18n.setLocale('en');
		const { getByText } = render(Page);
		expect(getByText('How Noxacloud builds and maintains your system')).toBeTruthy();
		expect(getByText('Isolated environments')).toBeTruthy();
	});
});
