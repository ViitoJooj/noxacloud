export interface PortalNavLink {
	href: string;
	label: string;
}

export interface PortalNavGroup {
	label: string;
	links: PortalNavLink[];
}

export function mainNavGroup(t: (key: string) => string): PortalNavGroup {
	return {
		label: t('portal.mainGroup'),
		links: [
			{ href: '/projects', label: t('projects.title') },
			{ href: '/contracts', label: t('contracts.title') },
			{ href: '/tickets', label: t('tickets.title') }
		]
	};
}

export function settingsNavGroup(t: (key: string) => string): PortalNavGroup {
	return {
		label: t('portal.settingsGroup'),
		links: [
			{ href: '/profile', label: t('profile.title') },
			{ href: '/payments', label: t('payments.title') }
		]
	};
}
