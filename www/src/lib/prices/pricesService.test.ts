import { describe, expect, it } from 'vitest';
import { PricesService, LANDING_PAGE_ID } from './pricesService';

describe('PricesService', () => {
	it('returns pt-br content', () => {
		const content = new PricesService().getContent('pt-br');
		expect(content.tipoOptions.length).toBeGreaterThan(0);
		expect(content.recursoOptions.some((o) => o.id === LANDING_PAGE_ID)).toBe(true);
	});

	it('returns en content', () => {
		const content = new PricesService().getContent('en');
		expect(content.tipoOptions.length).toBeGreaterThan(0);
		expect(content.recursoOptions.some((o) => o.id === LANDING_PAGE_ID)).toBe(true);
	});
});
