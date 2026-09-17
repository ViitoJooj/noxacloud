import { describe, expect, it } from 'vitest';
import { InfrastructureService } from './infrastructureService';

describe('InfrastructureService', () => {
	it('returns pt-br content', () => {
		const content = new InfrastructureService().getContent('pt-br');
		expect(content.stackRows.length).toBeGreaterThan(0);
	});

	it('returns en content', () => {
		const content = new InfrastructureService().getContent('en');
		expect(content.stackRows.length).toBeGreaterThan(0);
	});
});
