import { describe, expect, it } from 'vitest';
import { DocumentationService } from './documentationService';

describe('DocumentationService', () => {
	it('returns pt-br content', () => {
		const content = new DocumentationService().getContent('pt-br');
		expect(content.endpoints.length).toBeGreaterThan(0);
		expect(content.groupOrder).toContain('Pedidos');
	});

	it('returns en content', () => {
		const content = new DocumentationService().getContent('en');
		expect(content.endpoints.length).toBeGreaterThan(0);
		expect(content.groupOrder).toContain('Orders');
	});
});
