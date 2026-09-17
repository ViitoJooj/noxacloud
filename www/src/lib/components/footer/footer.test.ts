import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Footer from './footer.svelte';

describe('Footer', () => {
	it('renders the brand and tagline', () => {
		const { getByText } = render(Footer);
		expect(getByText('Noxacloud')).toBeTruthy();
		expect(
			getByText(/Tecnologia e infraestrutura sob medida para o comércio local/)
		).toBeTruthy();
	});

	it('renders the copyright with the current year and the domain', () => {
		const { getByText } = render(Footer);
		const year = new Date().getFullYear();
		expect(getByText(new RegExp(String(year)))).toBeTruthy();
		expect(getByText('noxacloud.com.br')).toBeTruthy();
	});

	it('renders the product and company link columns', () => {
		const { getByText } = render(Footer);
		expect(getByText('Produto')).toBeTruthy();
		expect(getByText('Empresa')).toBeTruthy();
		expect(getByText('Preços')).toBeTruthy();
		expect(getByText('Termos de Serviço')).toBeTruthy();
	});
});
