<script lang="ts">
	import "./styles.scss"
	import { i18n } from '$lib/i18n/store.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Card from '$lib/components/card/card.svelte';
	import Table from '$lib/components/table/table.svelte';
	import SectionHeading from '$lib/components/section-heading/section-heading.svelte';
	import { homeService } from '$lib/home/homeService';
	import { comparisonColumns, comparisonRowId } from './page';
	import heroDatacenterUrl from '$lib/assets/images/hero-datacenter.png';

	const content = $derived(homeService.getContent(i18n.locale));
	let openFaqIndex = $state<number | null>(null);

	function toggleFaq(index: number) {
		openFaqIndex = openFaqIndex === index ? null : index;
	}
</script>

<section class="home-hero-bleed">
	<div class="home-hero-bg" style:background-image="url({heroDatacenterUrl})"></div>
	<div class="home-hero-scrim"></div>
	<div class="home-hero-copy-overlay">
		<h1 class="home-hero-title">{i18n.t('home.hero.title')}</h1>
		<p class="home-hero-sub">{i18n.t('home.hero.subtitle')}</p>
		<div class="home-button-row">
			<Button variant="primary" href="/prices">{i18n.t('home.hero.simulateButton')}</Button>
			<Button variant="ghost" href="/contact">{i18n.t('home.hero.talkButton')}</Button>
		</div>
	</div>
</section>

<div class="accent-divider"></div>

<section class="home-section home-business-types">
	<SectionHeading
		kicker={i18n.t('home.businessTypes.kicker')}
		title={i18n.t('home.businessTypes.title')}
		lead={i18n.t('home.businessTypes.lead')}
	/>
	<div class="home-type-grid">
		{#each content.businessTypes as type (type.title)}
			<a class="home-type-cell" href="/prices">
				<strong>{type.title}</strong>
				<span>{type.desc}</span>
			</a>
		{/each}
	</div>
	<p class="home-section-note">
		{i18n.t('home.businessTypes.noteBefore')} {content.businessTypeCount} {i18n.t(
			'home.businessTypes.noteAfter'
		)}
		<a href="/contact">{i18n.t('home.businessTypes.noteLink')}</a>
	</p>
</section>

<section class="home-section home-pillars">
	<SectionHeading
		kicker={i18n.t('home.pillars.kicker')}
		title={i18n.t('home.pillars.title')}
		lead={i18n.t('home.pillars.lead')}
	/>
	<div class="home-card-grid home-card-grid-3">
		{#each content.pillars as pillar, i (pillar.title)}
			<Card kicker={String(i + 1).padStart(2, '0')} title={pillar.title} body={pillar.desc} />
		{/each}
	</div>
	<p class="home-section-note"><a href="/infrastructure">{i18n.t('home.pillars.noteLink')}</a></p>
</section>

<section class="home-section home-steps">
	<SectionHeading
		kicker={i18n.t('home.steps.kicker')}
		title={i18n.t('home.steps.title')}
		lead={i18n.t('home.steps.lead')}
	/>
	<div class="home-card-grid home-card-grid-5">
		{#each content.steps as step, i (step.title)}
			<Card kicker={String(i + 1).padStart(2, '0')} title={step.title} body={step.desc} />
		{/each}
	</div>
</section>

<section class="home-section home-comparison">
	<SectionHeading
		kicker={i18n.t('home.comparison.kicker')}
		title={i18n.t('home.comparison.title')}
		lead={i18n.t('home.comparison.lead')}
	/>
	<div class="home-comparison-table">
		<Table columns={comparisonColumns()} rows={content.comparisonRows} getRowId={comparisonRowId} />
	</div>
</section>

<section class="home-section home-guarantees">
	<SectionHeading
		kicker={i18n.t('home.guarantees.kicker')}
		title={i18n.t('home.guarantees.title')}
		lead={i18n.t('home.guarantees.lead')}
	/>
	<div class="home-card-grid home-card-grid-4">
		{#each content.guarantees as guarantee (guarantee.title)}
			<Card title={guarantee.title} body={guarantee.desc} />
		{/each}
	</div>
	<p class="home-section-note"><a href="/terms">{i18n.t('home.guarantees.noteLink')}</a></p>
</section>

<section class="home-section home-faq">
	<span class="kicker">{i18n.t('home.faq.kicker')}</span>
	<hr class="caption-rule" />
	<div class="home-faq-list">
		{#each content.faq as item, i (item.q)}
			<div class="home-faq-item">
				<button
					type="button"
					class="home-faq-q"
					onclick={() => toggleFaq(i)}
					aria-expanded={openFaqIndex === i}
					aria-controls="home-faq-answer-{i}"
				>
					<span>{item.q}</span>
					<span class="home-faq-sign">{openFaqIndex === i ? '−' : '+'}</span>
				</button>
				{#if openFaqIndex === i}
					<p class="home-faq-a" id="home-faq-answer-{i}">{item.a}</p>
				{/if}
			</div>
		{/each}
	</div>
</section>

<section class="home-cta-band">
	<h3>{i18n.t('home.cta.title')}</h3>
	<p>{i18n.t('home.cta.body')}</p>
	<div class="home-button-row">
		<Button variant="primary" href="/prices">{i18n.t('home.hero.simulateButton')}</Button>
		<Button variant="ghost" href="/contact">{i18n.t('home.hero.talkButton')}</Button>
	</div>
</section>
