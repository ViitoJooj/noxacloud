<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import type { PortalNavGroup } from './+page';
	import type { Snippet } from 'svelte';

	let { groups, activeHref, children }: { groups: PortalNavGroup[]; activeHref: string; children: Snippet } =
		$props();
</script>

<div class="portal">
	<div class="portal-body">
		<aside class="portal-sidebar">
			{#each groups as group (group.label)}
				<nav class="portal-nav">
					<span class="portal-nav-label">{group.label}</span>
					{#each group.links as link (link.href)}
						<a href={link.href} class:active={link.href === activeHref}>{link.label}</a>
					{/each}
				</nav>
			{/each}
			<a href="/" class="portal-nav-back">{i18n.t('portal.exit')}</a>
		</aside>
		<main class="portal-main">
			<div class="portal-main-inner">
				{@render children()}
			</div>
		</main>
	</div>
</div>
