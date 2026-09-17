import { describe, expect, it } from 'vitest';
import { ContactService, type ContactFormPayload } from './contactService';

describe('ContactService', () => {
	it('resolves ok on submit', async () => {
		const service = new ContactService();
		const payload: ContactFormPayload = {
			firstName: 'Ana',
			lastName: 'Silva',
			email: 'ana@example.com',
			phone: '11999999999',
			supportType: 'comercial',
			message: 'Quero um orçamento'
		};
		const result = await service.submit(payload);
		expect(result.ok).toBe(true);
	});
});
