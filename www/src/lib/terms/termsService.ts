import type { Locale } from '$lib/i18n/store.svelte';
import { termsMockPtBr, termsMockEn } from './termsMock';

export interface TermsBlock {
	p?: string;
	list?: string[];
}

export interface TermsSubsection {
	heading: string;
	blocks: TermsBlock[];
}

export interface TermsSection {
	title: string;
	subsections: TermsSubsection[];
}

export class TermsService {
	getContent(locale: Locale): TermsSection[] {
		return locale === 'pt-br' ? termsMockPtBr : termsMockEn;
	}
}

export const termsService = new TermsService();
