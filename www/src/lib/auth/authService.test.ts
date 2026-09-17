import { describe, expect, it } from 'vitest';
import { AuthService, type LoginPayload, type RegisterPayload } from './authService';

describe('AuthService', () => {
	it('resolves ok on login', async () => {
		const service = new AuthService();
		const payload: LoginPayload = { email: 'ana@example.com', password: 'segredo123' };
		const result = await service.login(payload);
		expect(result.ok).toBe(true);
	});

	it('resolves ok on register', async () => {
		const service = new AuthService();
		const payload: RegisterPayload = {
			name: 'Ana Silva',
			email: 'ana@example.com',
			password: 'segredo123'
		};
		const result = await service.register(payload);
		expect(result.ok).toBe(true);
	});
});
