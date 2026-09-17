<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Button from '$lib/components/button/button.svelte';
	import { LANDING_PAGE_ID, pricesService, type PriceOption } from '$lib/prices/pricesService';
	import { computeEstimate, defaultSelection, toggleInList, type PricesSelection } from './page';

	const content = $derived(pricesService.getContent(i18n.locale));

	let selection: PricesSelection = $state(defaultSelection(pricesService.getContent(i18n.locale)));

	const estimate = $derived(computeEstimate(content, selection));

	function selectRadio(field: 'tipo' | 'infra' | 'orquestracao' | 'local' | 'prazo' | 'dominio', id: string) {
		selection = { ...selection, [field]: id };
	}

	function toggleRecurso(id: string) {
		if (id === LANDING_PAGE_ID) {
			selection = {
				...selection,
				recursos: selection.recursos.includes(LANDING_PAGE_ID) ? [] : [LANDING_PAGE_ID]
			};
			return;
		}
		if (selection.recursos.includes(LANDING_PAGE_ID)) return;
		selection = { ...selection, recursos: toggleInList(selection.recursos, id) };
	}

	function toggleIntegracao(id: string) {
		selection = { ...selection, integracoes: toggleInList(selection.integracoes, id) };
	}

	function isRecursoDisabled(id: string): boolean {
		return id !== LANDING_PAGE_ID && selection.recursos.includes(LANDING_PAGE_ID);
	}
</script>

{#snippet radioGroup(
	options: PriceOption[],
	name: string,
	selected: string,
	onSelect: (id: string) => void
)}
	<div class="box-grid">
		{#each options as opt (opt.id)}
			<label class="option-box" class:selected={selected === opt.id}>
				<input type="radio" {name} checked={selected === opt.id} onchange={() => onSelect(opt.id)} />
				<span class="option-indicator"></span>
				<span>{opt.label}</span>
				<span class="option-info" title={opt.desc}>i</span>
			</label>
		{/each}
	</div>
{/snippet}

<section class="prices-hero">
	<span class="kicker">{i18n.t('prices.kicker')}</span>
	<hr class="caption-rule" />
	<h1>{i18n.t('prices.title')}</h1>
	<p class="prices-sub">{i18n.t('prices.subtitle')}</p>
</section>

<section class="calc-layout">
	<div class="calc-form">
		<div class="calc-block">
			<span class="group-label">{i18n.t('prices.blocks.tipo')}</span>
			{@render radioGroup(content.tipoOptions, 'tipo', selection.tipo, (id) => selectRadio('tipo', id))}
		</div>

		<div class="calc-block">
			<span class="group-label">{i18n.t('prices.blocks.recursos')}</span>
			<div class="box-grid">
				{#each content.recursoOptions as opt (opt.id)}
					<label
						class="option-box"
						class:selected={selection.recursos.includes(opt.id)}
						class:disabled={isRecursoDisabled(opt.id)}
					>
						<input
							type="checkbox"
							checked={selection.recursos.includes(opt.id)}
							disabled={isRecursoDisabled(opt.id)}
							onchange={() => toggleRecurso(opt.id)}
						/>
						<span class="option-indicator"></span>
						<span>{opt.label}</span>
						<span class="option-info" title={opt.desc}>i</span>
					</label>
				{/each}
			</div>
			<p class="domain-note">{i18n.t('prices.blocks.recursosNote')}</p>
		</div>

		<div class="calc-block">
			<span class="group-label">{i18n.t('prices.blocks.integracoes')}</span>
			<div class="box-grid">
				{#each content.integracaoOptions as opt (opt.id)}
					<label class="option-box" class:selected={selection.integracoes.includes(opt.id)}>
						<input
							type="checkbox"
							checked={selection.integracoes.includes(opt.id)}
							onchange={() => toggleIntegracao(opt.id)}
						/>
						<span class="option-indicator"></span>
						<span>{opt.label}</span>
						<span class="option-info" title={opt.desc}>i</span>
					</label>
				{/each}
			</div>
		</div>

		<div class="calc-block">
			<span class="group-label">{i18n.t('prices.blocks.infra')}</span>
			{@render radioGroup(content.infraOptions, 'infra', selection.infra, (id) => selectRadio('infra', id))}
		</div>

		<div class="calc-block">
			<span class="group-label">{i18n.t('prices.blocks.tecnicas')}</span>
			<span class="group-sublabel">{i18n.t('prices.blocks.orquestracao')}</span>
			{@render radioGroup(
				content.orquestracaoOptions,
				'orquestracao',
				selection.orquestracao,
				(id) => selectRadio('orquestracao', id)
			)}
			<span class="group-sublabel">{i18n.t('prices.blocks.local')}</span>
			{@render radioGroup(content.localOptions, 'local', selection.local, (id) => selectRadio('local', id))}
		</div>

		<div class="calc-block">
			<span class="group-label">{i18n.t('prices.blocks.prazo')}</span>
			{@render radioGroup(content.prazoOptions, 'prazo', selection.prazo, (id) => selectRadio('prazo', id))}
		</div>

		<div class="calc-block">
			<span class="group-label">{i18n.t('prices.blocks.dominio')}</span>
			{@render radioGroup(content.dominioOptions, 'dominio', selection.dominio, (id) => selectRadio('dominio', id))}
		</div>
	</div>

	<aside class="price-summary">
		<span class="kicker">{i18n.t('prices.summary.kicker')}</span>
		<div class="estimate-row">
			<span>{i18n.t('prices.summary.setup')}</span>
			<span class="val">{estimate.setupText}</span>
		</div>
		<div class="estimate-row">
			<span>{i18n.t('prices.summary.infra').replace('{infra}', estimate.infraLabel)}</span>
			<span class="val">{estimate.infraMonthlyText}</span>
		</div>
		<div class="estimate-row">
			<span>{i18n.t('prices.summary.monthly')}</span>
			<span class="val">{estimate.monthlyText}</span>
		</div>
		<div class="estimate-row estimate-total">
			<span>{i18n.t('prices.summary.total')}</span>
			<span class="val">{estimate.totalMonthlyText}</span>
		</div>
		<p class="price-summary-note">{i18n.t('prices.summary.note')}</p>
		<Button variant="primary" block href="/contact">{i18n.t('prices.summary.submit')}</Button>
	</aside>
</section>
