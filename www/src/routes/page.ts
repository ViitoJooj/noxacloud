import { i18n } from '$lib/i18n/store.svelte';
import type { TableColumn } from '$lib/components/table/+page';
import { type ComparisonRow } from '$lib/home/homeService';

export function comparisonColumns(): TableColumn<ComparisonRow>[] {
	return [
		{ key: 'criterion', header: '' },
		{ key: 'noxacloud', header: i18n.t('home.comparison.columnNoxacloud') },
		{ key: 'marketplace', header: i18n.t('home.comparison.columnMarketplace') },
		{ key: 'shopify', header: 'Shopify' },
		{ key: 'wix', header: 'Wix' },
		{ key: 'wooCommerce', header: 'WooCommerce' }
	];
}

export function comparisonRowId(row: ComparisonRow): string {
	return row.criterion;
}
