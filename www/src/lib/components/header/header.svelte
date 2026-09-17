<script lang="ts">
	import "./styles.scss"
	import { i18n } from '$lib/i18n/store.svelte';
	import Button from '$lib/components/button/button.svelte';
	import { NAV_LINKS } from './+page';
	import logoUrl from '$lib/assets/images/noxacloud-logo.png';
</script>

<header class="header-nav">
	<a class="header-brand" href="/">
		<img src={logoUrl} alt="" class="header-logo" />
		{i18n.t('brand')}
	</a>
	{#each NAV_LINKS as link (link.href)}
		<a href={link.href}>{i18n.t(link.labelKey)}</a>
	{/each}
	<Button variant="secondary" href="/login">{i18n.t('nav.login')}</Button>
	<Button variant="primary" href="/register">{i18n.t('nav.register')}</Button>
</header>