import { i18n } from '$lib/i18n/store.svelte';
import type { LayoutLoad } from './$types';

export const ssr = false;
export const prerender = false;

export const load: LayoutLoad = () => {
	i18n.init();
	return {};
};
