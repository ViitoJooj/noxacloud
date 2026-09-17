import { afterEach, describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Page from './+page.svelte';
import { i18n } from '$lib/i18n/store.svelte';

describe('Payments page', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
	});

	it('renders every invoice row', () => {
		const { getByText } = render(Page);
		expect(getByText('fat_2026_09')).toBeTruthy();
		expect(getByText('fat_2026_08')).toBeTruthy();
		expect(getByText('fat_2026_10')).toBeTruthy();
	});

	it('expands an invoice to show its breakdown', async () => {
		const { getByText, queryByText } = render(Page);
		expect(queryByText('Infraestrutura (Azure)')).toBeNull();
		await fireEvent.click(getByText('fat_2026_09'));
		expect(getByText('Infraestrutura (Azure)')).toBeTruthy();
	});

	it('marks a pending invoice as paid when "Pagar agora" is clicked', async () => {
		const { getByText, getByRole, getAllByText } = render(Page);
		await fireEvent.click(getByText('fat_2026_10'));
		await fireEvent.click(getByRole('button', { name: 'Pagar agora' }));
		expect(getAllByText('Pago').length).toBeGreaterThan(0);
	});

	it('masks the card and shows a saved tag after saving auto-payment', async () => {
		const { getByLabelText, getByRole, findByText } = render(Page);
		await fireEvent.input(getByLabelText('Número do cartão'), { target: { value: '4242424242424242' } });
		await fireEvent.click(getByRole('button', { name: 'Salvar cartão' }));
		expect(await findByText('Salvo')).toBeTruthy();
		expect((getByLabelText('Número do cartão') as HTMLInputElement).value).toContain('4242');
	});
});
