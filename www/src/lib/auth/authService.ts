export interface LoginPayload {
	email: string;
	password: string;
}

export interface RegisterPayload {
	name: string;
	email: string;
	password: string;
}

export interface AuthResult {
	ok: boolean;
}

export class AuthService {
	// Both stubbed until the backend login/register endpoints' contracts are
	// known — www/ is restricted from reading backend code, so this cannot
	// be wired for real yet.
	async login(payload: LoginPayload): Promise<AuthResult> {
		return { ok: true };
	}

	async register(payload: RegisterPayload): Promise<AuthResult> {
		return { ok: true };
	}
}
