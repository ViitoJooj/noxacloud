import type { Locale } from '$lib/i18n/store.svelte';
import { termsService, type TermsSection } from '$lib/terms/termsService';

export function termsSections(locale: Locale): TermsSection[] {
	return termsService.getContent(locale);
}
