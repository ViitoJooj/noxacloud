<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Segmented from '$lib/components/segmented/segmented.svelte';
	import Card from '$lib/components/card/card.svelte';
	import Tag from '$lib/components/tag/tag.svelte';
	import Table from '$lib/components/table/table.svelte';
	import {
		fullUrl,
		groupsForTier,
		paramColumns,
		paramRowId,
		tierIntro,
		tierOptions
	} from './page';
	import type { Tier } from '$lib/documentation/documentationService';

	let tier: Tier = $state('publica');
	let selectedKey = $state('');

	const groups = $derived(groupsForTier(tier));
	const visible = $derived(groups.flatMap((group) => group.endpoints));
	const selected = $derived(visible.find((ep) => ep.key === selectedKey) ?? visible[0]);

	function selectTier(value: string) {
		tier = value as Tier;
		selectedKey = '';
	}
</script>

<section class="hero">
	<span class="kicker">{i18n.t('documentation.kicker')}</span>
	<hr class="caption-rule" />
	<h1>{i18n.t('documentation.title')}</h1>
	<p class="sub">{i18n.t('documentation.subtitle')}</p>
</section>

<section class="auth">
	<span class="kicker">{i18n.t('documentation.auth.kicker')}</span>
	<hr class="caption-rule" />
	<p class="section-intro">{i18n.t('documentation.auth.intro')}</p>
	<div class="card-grid">
		<Card title="access_token" body={i18n.t('documentation.auth.accessToken')} />
		<Card title="refresh_token" body={i18n.t('documentation.auth.refreshToken')} />
		<Card title="Bearer token" body={i18n.t('documentation.auth.bearerToken')} />
	</div>
</section>

<section class="endpoints">
	<span class="kicker">{i18n.t('documentation.endpoints.kicker')}</span>
	<hr class="caption-rule" />
	<Segmented name="tier" options={tierOptions()} selected={tier} onSelect={selectTier} />
	<p class="section-intro">{tierIntro(tier)}</p>

	<div class="api-layout">
		<nav class="api-nav">
			{#each groups as group (group.name)}
				<div class="api-nav-group">
					<span class="api-nav-group-label">{group.name}</span>
					{#each group.endpoints as ep (ep.key)}
						<button
							type="button"
							class="api-nav-item"
							class:active={selected?.key === ep.key}
							aria-current={selected?.key === ep.key ? 'true' : undefined}
							onclick={() => (selectedKey = ep.key)}
						>
							<Tag variant="outline" label={ep.method} />
							<code>{ep.path}</code>
						</button>
					{/each}
				</div>
			{/each}
		</nav>

		{#if selected}
			<div class="api-detail">
				<div class="api-detail-header">
					<Tag variant="accent" label={selected.method} />
					<code>{fullUrl(selected.path)}</code>
				</div>
				<h3>{selected.desc}</h3>
				<p>{selected.longDesc}</p>

				{#if selected.params.length > 0}
					<h4>{i18n.t('documentation.params.heading')}</h4>
					<Table columns={paramColumns()} rows={selected.params} getRowId={paramRowId} />
				{/if}

				{#if selected.requestRaw}
					<h4>{i18n.t('documentation.request.heading')}</h4>
					<pre class="code-block">{selected.requestRaw}</pre>
				{/if}

				<h4>{i18n.t('documentation.responses.heading')}</h4>
				{#each selected.responses as response (response.code)}
					<div class="response-block">
						<div class="response-header">
							<Tag variant={response.code.startsWith('2') ? 'accent' : 'outline'} label={response.code} />
							<span>{response.desc}</span>
						</div>
						{#if response.example}
							<pre class="code-block">{response.example}</pre>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
