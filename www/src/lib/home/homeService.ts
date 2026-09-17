import type { Locale } from '$lib/i18n/store.svelte';
import { homeMockPtBr, homeMockEn } from './homeMock';

export interface LabeledItem {
	title: string;
	desc: string;
}

export interface ComparisonRow extends Record<string, unknown> {
	criterion: string;
	noxacloud: string;
	marketplace: string;
	shopify: string;
	wix: string;
	wooCommerce: string;
}

export interface FaqItem {
	q: string;
	a: string;
}

export interface HomeContent {
	businessTypeCount: number;
	businessTypes: LabeledItem[];
	pillars: LabeledItem[];
	steps: LabeledItem[];
	comparisonRows: ComparisonRow[];
	guarantees: LabeledItem[];
	faq: FaqItem[];
}

export class HomeService {
	getContent(locale: Locale): HomeContent {
		return locale === 'pt-br' ? homeMockPtBr : homeMockEn;
	}
}

export const homeService = new HomeService();
