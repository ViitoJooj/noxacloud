import { afterEach, describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Header from './header.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Header', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders the brand and every public nav link', () => {
		const { getByText } = render(Header);
		expect(getByText('Noxacloud')).toBeTruthy();
		expect(getByText('Início')).toBeTruthy();
		expect(getByText('Infraestrutura')).toBeTruthy();
		expect(getByText('Documentação')).toBeTruthy();
		expect(getByText('Preços')).toBeTruthy();
		expect(getByText('Contato')).toBeTruthy();
	});

	it('renders login and register as links to their routes', () => {
		const { getByText } = render(Header);
		expect(getByText('Entrar').closest('a')?.getAttribute('href')).toBe('/login');
		expect(getByText('Criar conta').closest('a')?.getAttribute('href')).toBe('/register');
	});
});
