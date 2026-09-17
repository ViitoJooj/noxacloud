<script lang="ts">
	import '../app.scss';
	import favicon from '$lib/assets/icons/favicon.svg';
	import Header from '$lib/components/header/header.svelte';
	import Footer from '$lib/components/footer/footer.svelte';
	import AccessibilityPanel from '$lib/components/accessibility-panel/accessibility-panel.svelte';
	import { i18n } from '$lib/i18n/store.svelte';

	let { children } = $props();

	$effect(() => {
		document.documentElement.lang = i18n.locale;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />
<div class="accent-divider"></div>
{@render children()}
<Footer />
<AccessibilityPanel />
