import { afterEach, describe, expect, it } from 'vitest';
import { i18n } from './store.svelte';

describe('I18nStore', () => {
	afterEach(() => {
		i18n.setLocale('pt-br');
		localStorage.clear();
	});

	it('defaults to pt-br', () => {
		expect(i18n.locale).toBe('pt-br');
	});

	it('resolves a dot-path key from the active dictionary', () => {
		expect(i18n.t('nav.home')).toBe('Início');
	});

	it('falls back to the key itself when missing', () => {
		expect(i18n.t('nope.missing')).toBe('nope.missing');
	});

	it('switches dictionaries and persists the choice', () => {
		i18n.setLocale('en');
		expect(i18n.t('nav.home')).toBe('Home');
		expect(localStorage.getItem('noxacloud.locale')).toBe('en');
	});

	it('init reads a previously persisted locale', () => {
		localStorage.setItem('noxacloud.locale', 'en');
		i18n.init();
		expect(i18n.locale).toBe('en');
	});

	it('keeps every key in sync between en and pt-br', async () => {
		const en = (await import('./en.json')).default;
		const ptBr = (await import('./pt-br.json')).default;
		const flatten = (obj: unknown, prefix = ''): string[] =>
			Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
				typeof value === 'object' && value !== null
					? flatten(value, `${prefix}${key}.`)
					: [`${prefix}${key}`]
			);
		expect(flatten(en).sort()).toEqual(flatten(ptBr).sort());
	});
});
