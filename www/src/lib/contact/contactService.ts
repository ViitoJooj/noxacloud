export interface ContactFormPayload {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	supportType: string;
	message: string;
}

export interface ContactSubmitResult {
	ok: boolean;
}

export class ContactService {
	// Stubbed until the backend contact endpoint's contract is known —
	// www/ is restricted from reading backend code, so this cannot be
	// wired for real yet.
	async submit(payload: ContactFormPayload): Promise<ContactSubmitResult> {
		return { ok: true };
	}
}
