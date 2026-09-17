<script lang="ts">
	import "./styles.scss"
	import { i18n } from '$lib/i18n/store.svelte';
	import Card from '$lib/components/card/card.svelte';
	import Table from '$lib/components/table/table.svelte';
	import Button from '$lib/components/button/button.svelte';
	import { infrastructureService } from '$lib/infrastructure/infrastructureService';
	import { stackColumns, stackRowId } from './page';
	import heroDatacenterUrl from '$lib/assets/images/hero-datacenter.png';

	const content = $derived(infrastructureService.getContent(i18n.locale));
</script>

<section class="infra-hero-bleed">
	<div class="infra-hero-bg" style:background-image="url({heroDatacenterUrl})"></div>
	<div class="infra-hero-scrim"></div>
	<div class="infra-hero-copy-overlay">
		<span class="kicker">{i18n.t('infrastructure.kicker')}</span>
		<hr class="caption-rule" />
		<h1 class="infra-hero-title">{i18n.t('infrastructure.title')}</h1>
		<p class="infra-sub">{i18n.t('infrastructure.subtitle')}</p>
		<div class="infra-button-row">
			<Button variant="primary" href="/prices">{i18n.t('home.hero.simulateButton')}</Button>
			<Button variant="ghost" href="/contact">{i18n.t('home.hero.talkButton')}</Button>
		</div>
	</div>
</section>

<div class="accent-divider"></div>

<section class="infra-flow">
	<span class="kicker">{i18n.t('infrastructure.flow.kicker')}</span>
	<hr class="caption-rule" />
	<div class="infra-flow-row">
		{#each content.flowSteps as step, i (step)}
			{#if i > 0}
				<span class="infra-flow-arrow">→</span>
			{/if}
			<span class="infra-flow-step">{step}</span>
		{/each}
	</div>
</section>

<section class="infra-managed">
	<span class="kicker">{i18n.t('infrastructure.managed.kicker')}</span>
	<hr class="caption-rule" />
	<div class="infra-card-grid">
		{#each content.managedItems as item (item.title)}
			<Card title={item.title} body={item.desc} />
		{/each}
	</div>
</section>

<section class="infra-notifications">
	<span class="kicker">{i18n.t('infrastructure.notifications.kicker')}</span>
	<hr class="caption-rule" />
	<p class="infra-section-intro">{i18n.t('infrastructure.notifications.intro')}</p>
	<div class="infra-card-grid">
		{#each content.notificationItems as item (item.title)}
			<Card title={item.title} body={item.desc} />
		{/each}
	</div>
</section>

<section class="infra-stack">
	<span class="kicker">{i18n.t('infrastructure.stack.kicker')}</span>
	<hr class="caption-rule" />
	<p class="infra-section-intro">{i18n.t('infrastructure.stack.intro')}</p>
	<Table columns={stackColumns()} rows={content.stackRows} getRowId={stackRowId} />
</section>
