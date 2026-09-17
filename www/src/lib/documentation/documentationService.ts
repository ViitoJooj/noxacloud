import type { Locale } from '$lib/i18n/store.svelte';
import { documentationMockPtBr, documentationMockEn } from './documentationMock';

export type Tier = 'publica' | 'cliente';

export interface EndpointParam extends Record<string, unknown> {
	name: string;
	location: string;
	type: string;
	required: string;
	desc: string;
}

export interface EndpointResponse {
	code: string;
	desc: string;
	example: string;
}

export interface Endpoint {
	key: string;
	group: string;
	tier: Tier;
	method: string;
	path: string;
	desc: string;
	longDesc: string;
	params: EndpointParam[];
	requestRaw: string;
	responses: EndpointResponse[];
}

export interface DocumentationContent {
	groupOrder: string[];
	endpoints: Endpoint[];
}

export class DocumentationService {
	getContent(locale: Locale): DocumentationContent {
		return locale === 'pt-br' ? documentationMockPtBr : documentationMockEn;
	}
}

export const documentationService = new DocumentationService();
