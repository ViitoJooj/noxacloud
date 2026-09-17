import { describe, expect, it } from 'vitest';
import { HomeService } from './homeService';

describe('HomeService', () => {
	it('returns pt-br content', () => {
		const content = new HomeService().getContent('pt-br');
		expect(content.businessTypeCount).toBe(17);
		expect(content.faq.length).toBeGreaterThan(0);
	});

	it('returns en content', () => {
		const content = new HomeService().getContent('en');
		expect(content.businessTypeCount).toBe(17);
		expect(content.faq.length).toBeGreaterThan(0);
	});
});
