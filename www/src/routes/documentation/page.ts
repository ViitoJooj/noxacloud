import { i18n } from '$lib/i18n/store.svelte';
import type { SegmentedOption } from '$lib/components/segmented/+page';
import type { TableColumn } from '$lib/components/table/+page';
import {
	documentationService,
	type Endpoint,
	type EndpointParam,
	type Tier
} from '$lib/documentation/documentationService';

export interface EndpointGroup {
	name: string;
	endpoints: Endpoint[];
}

export function fullUrl(path: string): string {
	return `https://api.noxacloud.com.br${path}`;
}

export function tierOptions(): SegmentedOption[] {
	return [
		{ value: 'publica', label: i18n.t('documentation.tier.publica') },
		{ value: 'cliente', label: i18n.t('documentation.tier.cliente') }
	];
}

export function groupsForTier(tier: Tier): EndpointGroup[] {
	const content = documentationService.getContent(i18n.locale);
	const visible = content.endpoints.filter((ep) => ep.tier === tier);
	return content.groupOrder
		.map((name) => ({ name, endpoints: visible.filter((ep) => ep.group === name) }))
		.filter((group) => group.endpoints.length > 0);
}

export function paramColumns(): TableColumn<EndpointParam>[] {
	return [
		{ key: 'name', header: i18n.t('documentation.params.name') },
		{ key: 'location', header: i18n.t('documentation.params.location') },
		{ key: 'type', header: i18n.t('documentation.params.type') },
		{ key: 'required', header: i18n.t('documentation.params.required') },
		{ key: 'desc', header: i18n.t('documentation.params.desc') }
	];
}

export function paramRowId(param: EndpointParam): string {
	return param.name;
}

export function tierIntro(tier: Tier): string {
	return tier === 'publica'
		? i18n.t('documentation.endpoints.publicIntro')
		: i18n.t('documentation.endpoints.clientIntro');
}
