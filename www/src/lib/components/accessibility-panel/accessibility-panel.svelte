<script lang="ts">
	import './styles.scss';
	import { fly } from 'svelte/transition';
	import { i18n, otherLocale, toggleLocale } from '$lib/i18n/store.svelte';
	import Button from '$lib/components/button/button.svelte';

	let open = $state(false);
</script>

<div class="a11y-widget">
	<button
		type="button"
		class="a11y-tab"
		onclick={() => (open = !open)}
		aria-expanded={open}
		aria-label={i18n.t('accessibility.label')}
	>
		<svg class="a11y-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
			<circle cx="12" cy="5.5" r="2" />
			<path d="M4 8.5c2.5 1 5.3 1.5 8 1.5s5.5-.5 8-1.5" />
			<path d="M12 10v5" />
			<path d="M12 15l-3.5 6" />
			<path d="M12 15l3.5 6" />
			<path d="M9 12l-1.5 3" />
			<path d="M15 12l1.5 3" />
		</svg>
		<span class="a11y-tab-label">{i18n.t('accessibility.label')}</span>
		<svg class="a11y-tab-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
			<circle cx="12" cy="12" r="8" />
			<path d="M4 12h16" />
			<path d="M12 4c2.2 2.2 3.3 5 3.3 8s-1.1 5.8-3.3 8c-2.2-2.2-3.3-5-3.3-8S9.8 6.2 12 4z" />
		</svg>
	</button>
	{#if open}
		<div class="a11y-panel" transition:fly={{ x: 24, duration: 150 }}>
			<div class="a11y-panel-header">
				<span class="kicker">{i18n.t('accessibility.kicker')}</span>
				<button
					type="button"
					class="a11y-panel-close"
					onclick={() => (open = false)}
					aria-label={i18n.t('accessibility.close')}
				>
					×
				</button>
			</div>
			<Button variant="secondary" block onClick={toggleLocale}>
				{i18n.t(`language.${otherLocale(i18n.locale)}`)}
			</Button>
		</div>
	{/if}
</div>
