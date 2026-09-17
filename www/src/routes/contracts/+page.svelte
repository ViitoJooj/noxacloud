<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Button from '$lib/components/button/button.svelte';
	import PortalShell from '$lib/components/portal-shell/portal-shell.svelte';
	import { mainNavGroup } from '$lib/components/portal-shell/+page';
	import { initialContractDocs } from './page';

	const docs = initialContractDocs();
	let selectedId: string | null = $state(null);

	const selected = $derived(docs.find((d) => d.id === selectedId) ?? null);

	function selectDoc(id: string) {
		selectedId = selectedId === id ? null : id;
	}

	function closePanel() {
		selectedId = null;
	}

	const navGroups = $derived([mainNavGroup((key) => i18n.t(key))]);
</script>

<PortalShell groups={navGroups} activeHref="/contracts">
	<h1>{i18n.t('contracts.title')}</h1>
	<p class="lead">{i18n.t('contracts.subtitle')}</p>

	<div class="file-explorer">
		<div class="file-grid">
			{#each docs as doc (doc.id)}
				<button
					type="button"
					class="file-card"
					class:active={doc.id === selectedId}
					onclick={() => selectDoc(doc.id)}
				>
					<svg class="file-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
						<path d="M14 2v6h6"></path>
					</svg>
					<span class="file-name">{doc.name}</span>
					<span class="file-meta">{doc.meta}</span>
				</button>
			{/each}
		</div>

		{#if selected}
			<aside class="file-detail-panel">
				<button type="button" class="file-detail-close" onclick={closePanel} aria-label={i18n.t('projects.close')}>×</button>
				<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="doc-detail-icon">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
					<path d="M14 2v6h6"></path>
				</svg>
				<h3 style="margin: 0 0 4px; font-size: 18px">{selected.name}</h3>
				<p class="text-muted" style="font-size: 13px; margin: 0 0 24px">{selected.meta}</p>

				<div class="kv" style="grid-template-columns: 1fr">
					<div><span class="k">{i18n.t('contracts.status')}</span><span class="v" style="font-size: 15px">{selected.status}</span></div>
					<div><span class="k">{i18n.t('contracts.type')}</span><span class="v" style="font-size: 15px">{selected.tipo}</span></div>
				</div>

				<div class="file-detail-actions">
					<Button variant="primary">{i18n.t('contracts.download')}</Button>
					<Button variant="ghost">{i18n.t('contracts.view')}</Button>
					<Button variant="ghost">{i18n.t('contracts.requestChange')}</Button>
					<Button variant="ghost">{i18n.t('contracts.transfer')}</Button>
					<Button variant="ghost">{i18n.t('contracts.cancel')}</Button>
				</div>
			</aside>
		{/if}
	</div>
</PortalShell>
