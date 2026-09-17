import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Contracts page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders every document as a card', () => {
		const { getByText } = render(Page);
		expect(getByText('Contrato de prestação de serviço.pdf')).toBeTruthy();
		expect(getByText('Termo de aceite digital.pdf')).toBeTruthy();
		expect(getByText('Escopo técnico do projeto.pdf')).toBeTruthy();
	});

	it('opens the detail panel with status and type when a document is selected', async () => {
		const { getByText, getByLabelText, queryByText } = render(Page);
		await fireEvent.click(getByText('Contrato de prestação de serviço.pdf'));
		expect(getByText('Assinado digitalmente')).toBeTruthy();
		expect(getByText('Contrato')).toBeTruthy();
		await fireEvent.click(getByLabelText('Fechar'));
		expect(queryByText('Assinado digitalmente')).toBeNull();
	});
});
