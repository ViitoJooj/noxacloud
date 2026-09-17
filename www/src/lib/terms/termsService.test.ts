import { describe, expect, it } from 'vitest';
import { TermsService } from './termsService';

describe('TermsService', () => {
	it('returns pt-br content', () => {
		const sections = new TermsService().getContent('pt-br');
		expect(sections.length).toBeGreaterThan(0);
	});

	it('returns en content', () => {
		const sections = new TermsService().getContent('en');
		expect(sections.length).toBeGreaterThan(0);
	});
});
