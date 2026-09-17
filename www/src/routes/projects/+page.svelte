<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Tag from '$lib/components/tag/tag.svelte';
	import Button from '$lib/components/button/button.svelte';
	import PortalShell from '$lib/components/portal-shell/portal-shell.svelte';
	import { mainNavGroup } from '$lib/components/portal-shell/+page';
	import {
		initialServers,
		statusTagVariant,
		PROVIDER_OPTIONS,
		type Server,
		type ServerStatus
	} from './page';

	let servers = $state(initialServers());
	let selectedId: string | null = $state(null);

	const selected = $derived(servers.find((srv) => srv.id === selectedId) ?? null);

	function selectServer(id: string) {
		selectedId = selectedId === id ? null : id;
	}

	function closePanel() {
		selectedId = null;
	}

	function setStatus(id: string, status: ServerStatus) {
		servers = servers.map((srv) => (srv.id === id ? { ...srv, status } : srv));
	}

	function setProvider(id: string, provider: Server['provider']) {
		servers = servers.map((srv) => (srv.id === id ? { ...srv, provider } : srv));
	}

	function toggleBackup(id: string) {
		servers = servers.map((srv) => (srv.id === id ? { ...srv, backupOn: !srv.backupOn } : srv));
	}

	function statusLabel(status: ServerStatus): string {
		return i18n.t(`projects.status.${status}`);
	}

	const navGroups = $derived([mainNavGroup((key) => i18n.t(key))]);
</script>

<PortalShell groups={navGroups} activeHref="/projects">
	<h1>{i18n.t('projects.title')}</h1>
	<p class="lead">{i18n.t('projects.subtitle')}</p>

	<div class="file-explorer">
		<div class="file-grid">
			{#each servers as srv (srv.id)}
				<button
					type="button"
					class="file-card"
					class:active={srv.id === selectedId}
					onclick={() => selectServer(srv.id)}
				>
					<svg class="file-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
						<rect x="4" y="3" width="16" height="6" rx="1"></rect>
						<rect x="4" y="11" width="16" height="6" rx="1"></rect>
						<rect x="4" y="19" width="16" height="2" rx="1"></rect>
						<circle cx="7.5" cy="6" r="0.6" fill="currentColor" stroke="none"></circle>
						<circle cx="7.5" cy="14" r="0.6" fill="currentColor" stroke="none"></circle>
					</svg>
					<span class="file-name">{srv.projectName}</span>
					<span class="file-meta">{srv.name}</span>
				</button>
			{/each}
		</div>

		{#if selected}
			<aside class="file-detail-panel">
				<button type="button" class="file-detail-close" onclick={closePanel} aria-label={i18n.t('projects.close')}>×</button>
				<Tag variant={statusTagVariant(selected.status)} label={statusLabel(selected.status)} />
				<h3 style="margin: 10px 0 4px; font-size: 18px">{selected.name}</h3>
				<p class="text-muted" style="font-size: 13px; margin: 0 0 24px">{selected.desc} · {i18n.t('projects.project')}: {selected.projectName}</p>

				<div class="kv" style="grid-template-columns: 1fr 1fr">
					<div><span class="k">CPU</span><span class="v" style="font-size: 15px">{selected.cpu}</span></div>
					<div><span class="k">{i18n.t('projects.memory')}</span><span class="v" style="font-size: 15px">{selected.mem}</span></div>
					<div><span class="k">{i18n.t('projects.disk')}</span><span class="v" style="font-size: 15px">{selected.disk}</span></div>
					<div><span class="k">IP</span><span class="v" style="font-size: 15px">{selected.ip}</span></div>
					<div><span class="k">{i18n.t('projects.region')}</span><span class="v" style="font-size: 15px">{selected.region}</span></div>
					<div><span class="k">{i18n.t('projects.createdAt')}</span><span class="v" style="font-size: 15px">{selected.createdAt}</span></div>
					<div><span class="k">{i18n.t('projects.updatedAt')}</span><span class="v" style="font-size: 15px">{selected.updatedAt}</span></div>
				</div>

				<span class="endpoint-panel-label">{i18n.t('projects.provider')}</span>
				<div class="provider-chip-row">
					{#each PROVIDER_OPTIONS as opt (opt.value)}
						<button
							type="button"
							class="provider-chip provider-{opt.value}"
							class:active={selected.provider === opt.value}
							onclick={() => setProvider(selected!.id, opt.value)}
						>
							{opt.label}
						</button>
					{/each}
				</div>

				<span class="endpoint-panel-label">{i18n.t('projects.autoBackup')}</span>
				<div class="backup-row">
					<label class="switch">
						<input type="checkbox" checked={selected.backupOn} onchange={() => toggleBackup(selected!.id)} />
						<span class="switch-track"></span>
					</label>
					<span class="switch-state">{selected.backupOn ? i18n.t('projects.backupOn') : i18n.t('projects.backupOff')}</span>
				</div>

				<div class="file-detail-actions">
					<Button
						variant="ghost"
						disabled={selected.status === 'paused'}
						onClick={() => setStatus(selected!.id, 'paused')}
					>
						{i18n.t('projects.pause')}
					</Button>
					<Button
						variant="ghost"
						disabled={selected.status === 'stopped'}
						onClick={() => setStatus(selected!.id, 'stopped')}
					>
						{i18n.t('projects.stop')}
					</Button>
					<Button variant="primary" onClick={() => setStatus(selected!.id, 'online')}>
						{i18n.t('projects.start')}
					</Button>
				</div>
			</aside>
		{/if}
	</div>
</PortalShell>
