<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Field from '$lib/components/field/field.svelte';
	import Tag from '$lib/components/tag/tag.svelte';
	import Segmented from '$lib/components/segmented/segmented.svelte';
	import Dialog from '$lib/components/dialog/dialog.svelte';
	import PortalShell from '$lib/components/portal-shell/portal-shell.svelte';
	import { mainNavGroup } from '$lib/components/portal-shell/+page';
	import {
		initialTickets,
		ticketTagVariant,
		emptyTicketDraft,
		TICKET_CATEGORIES,
		type TicketCategory
	} from './page';

	let tickets = $state(initialTickets());
	let modalOpen = $state(false);
	let draft = $state(emptyTicketDraft());

	const categoryOptions = TICKET_CATEGORIES.map((c) => ({ value: c, label: c }));

	function openModal() {
		draft = emptyTicketDraft();
		modalOpen = true;
	}

	function closeModal() {
		modalOpen = false;
	}

	function submitTicket(event: SubmitEvent) {
		event.preventDefault();
		tickets = [
			{
				id: Date.now(),
				title: draft.title || i18n.t('tickets.newTicketFallback'),
				category: draft.category,
				status: 'Aberto',
				date: i18n.t('tickets.today')
			},
			...tickets
		];
		modalOpen = false;
	}

	const navGroups = $derived([mainNavGroup((key) => i18n.t(key))]);
</script>

<PortalShell groups={navGroups} activeHref="/tickets">
	<h1>{i18n.t('tickets.title')}</h1>
	<p class="lead">{i18n.t('tickets.subtitle')}</p>

	<div class="row">
		<Button variant="primary" onClick={openModal}>{i18n.t('tickets.open')}</Button>
	</div>

	<div class="panel" style="padding: 0">
		<table class="table" style="margin: 0 24px">
			<thead>
				<tr>
					<th>{i18n.t('tickets.tableTitle')}</th>
					<th>{i18n.t('tickets.tableCategory')}</th>
					<th>{i18n.t('tickets.tableStatus')}</th>
					<th>{i18n.t('tickets.tableDate')}</th>
				</tr>
			</thead>
			<tbody>
				{#each tickets as t (t.id)}
					<tr>
						<td>{t.title}</td>
						<td>{t.category}</td>
						<td><Tag variant={ticketTagVariant(t.status)} label={t.status} /></td>
						<td>{t.date}</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div style="height: 12px"></div>
	</div>
</PortalShell>

<Dialog open={modalOpen} title={i18n.t('tickets.dialogTitle')} onClose={closeModal}>
	<form class="ticket-form" onsubmit={submitTicket}>
		<Field label={i18n.t('tickets.fieldTitle')} name="title" bind:value={draft.title} placeholder={i18n.t('tickets.fieldTitlePlaceholder')} required />
		<div class="field">
			<label for="ticket-category">{i18n.t('tickets.fieldCategory')}</label>
			<Segmented
				name="ticket-category"
				options={categoryOptions}
				selected={draft.category}
				onSelect={(value) => (draft.category = value as TicketCategory)}
			/>
		</div>
		<Field type="textarea" label={i18n.t('tickets.fieldDescription')} name="description" bind:value={draft.description} placeholder={i18n.t('tickets.fieldDescriptionPlaceholder')} />
		<div class="dialog-actions">
			<Button type="button" variant="secondary" onClick={closeModal}>{i18n.t('tickets.cancel')}</Button>
			<Button type="submit" variant="primary">{i18n.t('tickets.submit')}</Button>
		</div>
	</form>
</Dialog>
