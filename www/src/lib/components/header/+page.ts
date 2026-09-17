export interface NavLink {
	href: string;
	labelKey: string;
}

export const NAV_LINKS: NavLink[] = [
	{ href: '/', labelKey: 'nav.home' },
	{ href: '/infrastructure', labelKey: 'nav.infrastructure' },
	{ href: '/documentation', labelKey: 'nav.documentation' },
	{ href: '/prices', labelKey: 'nav.prices' },
	{ href: '/contact', labelKey: 'nav.contact' }
];
