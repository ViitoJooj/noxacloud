import { afterEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';
import { termsSections } from './page';

describe('Terms page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the hero title', () => {
		const { getByText } = render(Page);
		expect(getByText('Termos de Serviço')).toBeTruthy();
	});

	it('renders every section title', () => {
		const { getAllByText } = render(Page);
		for (const section of termsSections('pt-br')) {
			expect(getAllByText(section.title).length).toBeGreaterThan(0);
		}
	});

	it('renders in English when locale is en', () => {
		i18n.setLocale('en');
		const { getByText } = render(Page);
		expect(getByText('Terms of Service')).toBeTruthy();
	});

	it('renders list items from a subsection with a list block', () => {
		const { getByText } = render(Page);
		expect(getByText(/Suporte Técnico e SLA/)).toBeTruthy();
	});
});
