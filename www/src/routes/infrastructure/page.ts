import { i18n } from '$lib/i18n/store.svelte';
import type { TableColumn } from '$lib/components/table/+page';
import type { StackRow } from '$lib/infrastructure/infrastructureService';

export function stackColumns(): TableColumn<StackRow>[] {
	return [
		{ key: 'layer', header: i18n.t('infrastructure.stack.columns.layer') },
		{ key: 'technology', header: i18n.t('infrastructure.stack.columns.technology') },
		{ key: 'role', header: i18n.t('infrastructure.stack.columns.role') }
	];
}

export function stackRowId(row: StackRow): string {
	return row.technology;
}
