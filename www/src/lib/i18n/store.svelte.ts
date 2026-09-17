import en from './en.json';
import ptBr from './pt-br.json';

export type Locale = 'en' | 'pt-br';

type Dictionary = Record<string, unknown>;

const DICTIONARIES: Record<Locale, Dictionary> = { en, 'pt-br': ptBr };
const STORAGE_KEY = 'noxacloud.locale';

function readStoredLocale(): Locale {
	if (typeof localStorage === 'undefined') return 'pt-br';
	const stored = localStorage.getItem(STORAGE_KEY);
	return stored === 'en' || stored === 'pt-br' ? stored : 'pt-br';
}

function lookup(dictionary: Dictionary, key: string): string | undefined {
	const value = key.split('.').reduce<unknown>((node, segment) => {
		return typeof node === 'object' && node !== null ? (node as Dictionary)[segment] : undefined;
	}, dictionary);
	return typeof value === 'string' ? value : undefined;
}

export class I18nStore {
	locale: Locale = $state('pt-br');

	init(): void {
		this.locale = readStoredLocale();
	}

	setLocale(locale: Locale): void {
		this.locale = locale;
		if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, locale);
	}

	t(key: string): string {
		return lookup(DICTIONARIES[this.locale], key) ?? key;
	}
}

export const i18n = new I18nStore();

export function otherLocale(locale: Locale): Locale {
	return locale === 'pt-br' ? 'en' : 'pt-br';
}

export function toggleLocale(): void {
	i18n.setLocale(otherLocale(i18n.locale));
}
