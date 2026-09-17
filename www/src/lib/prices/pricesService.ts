import type { Locale } from '$lib/i18n/store.svelte';
import { pricesMockPtBr, pricesMockEn, LANDING_PAGE_ID } from './pricesMock';

export interface PriceOption {
	id: string;
	label: string;
	desc: string;
	setup?: number;
	monthly?: number;
}

export interface PricesContent {
	tipoOptions: PriceOption[];
	recursoOptions: PriceOption[];
	integracaoOptions: PriceOption[];
	infraOptions: PriceOption[];
	orquestracaoOptions: PriceOption[];
	localOptions: PriceOption[];
	prazoOptions: PriceOption[];
	dominioOptions: PriceOption[];
}

export { LANDING_PAGE_ID };

export class PricesService {
	getContent(locale: Locale): PricesContent {
		return locale === 'pt-br' ? pricesMockPtBr : pricesMockEn;
	}
}

export const pricesService = new PricesService();
