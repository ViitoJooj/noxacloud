import type { Locale } from '$lib/i18n/store.svelte';
import { infrastructureMockPtBr, infrastructureMockEn } from './infrastructureMock';

export interface InfraCard {
	title: string;
	desc: string;
}

export interface StackRow extends Record<string, unknown> {
	layer: string;
	technology: string;
	role: string;
}

export interface InfraContent {
	flowSteps: string[];
	managedItems: InfraCard[];
	notificationItems: InfraCard[];
	stackRows: StackRow[];
}

export class InfrastructureService {
	getContent(locale: Locale): InfraContent {
		return locale === 'pt-br' ? infrastructureMockPtBr : infrastructureMockEn;
	}
}

export const infrastructureService = new InfrastructureService();
