<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Field from '$lib/components/field/field.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Tag from '$lib/components/tag/tag.svelte';
	import PortalShell from '$lib/components/portal-shell/portal-shell.svelte';
	import { settingsNavGroup } from '$lib/components/portal-shell/+page';
	import {
		initialInvoices,
		invoiceTagVariant,
		emptyAutoPaymentForm,
		maskAutoPayment,
		type Invoice
	} from './page';

	let invoices = $state(initialInvoices());
	let expandedId: string | null = $state(null);

	let autoPayment = $state(emptyAutoPaymentForm());
	let autoPaymentSaved = $state(false);

	function toggleInvoice(id: string) {
		expandedId = expandedId === id ? null : id;
	}

	function saveAutoPayment(event: SubmitEvent) {
		event.preventDefault();
		autoPayment = maskAutoPayment(autoPayment);
		autoPaymentSaved = true;
	}

	function unlockAutoPayment() {
		autoPaymentSaved = false;
		autoPayment = emptyAutoPaymentForm();
	}

	function payNow(id: string) {
		invoices = invoices.map((inv: Invoice) =>
			inv.id === id ? { ...inv, status: 'Pago', paidAt: i18n.t('payments.today') } : inv
		);
	}

	const navGroups = $derived([settingsNavGroup((key) => i18n.t(key))]);
</script>

<PortalShell groups={navGroups} activeHref="/payments">
	<h1>{i18n.t('payments.title')}</h1>
	<p class="lead">{i18n.t('payments.subtitle')}</p>

	<form class="panel" onsubmit={saveAutoPayment} novalidate>
		<h3>{i18n.t('payments.autoHeading')}</h3>
		<p class="panel-note">{i18n.t('payments.autoNote')}</p>
		<Field
			label={i18n.t('payments.cardNameLabel')}
			name="cardNome"
			bind:value={autoPayment.nome}
			placeholder={i18n.t('payments.cardNamePlaceholder')}
			disabled={autoPaymentSaved}
		/>
		<Field
			label={i18n.t('payments.cardNumberLabel')}
			name="cardNumero"
			bind:value={autoPayment.numero}
			placeholder="0000 0000 0000 0000"
			disabled={autoPaymentSaved}
		/>
		<div class="row">
			<div class="field-grow">
				<Field
					label={i18n.t('payments.expiryLabel')}
					name="cardValidade"
					bind:value={autoPayment.validade}
					placeholder="MM/AA"
					disabled={autoPaymentSaved}
				/>
			</div>
			<div class="field-grow">
				<Field
					label={i18n.t('payments.cvvLabel')}
					name="cardCvv"
					bind:value={autoPayment.cvv}
					placeholder="000"
					disabled={autoPaymentSaved}
				/>
			</div>
		</div>
		<div class="row" style="margin-top: 12px">
			{#if !autoPaymentSaved}
				<Button type="submit">{i18n.t('payments.saveCard')}</Button>
			{:else}
				<Tag variant="accent" label={i18n.t('payments.saved')} />
				<Button type="button" variant="ghost" onClick={unlockAutoPayment}>{i18n.t('payments.edit')}</Button>
			{/if}
		</div>
	</form>

	<div class="panel">
		<h3>{i18n.t('payments.invoicesHeading')}</h3>
		<table class="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>{i18n.t('payments.issuedAt')}</th>
					<th>{i18n.t('payments.paidAt')}</th>
					<th>{i18n.t('payments.total')}</th>
					<th>{i18n.t('payments.status')}</th>
				</tr>
			</thead>
			<tbody>
				{#each invoices as inv (inv.id)}
					<tr style="cursor: pointer" onclick={() => toggleInvoice(inv.id)}>
						<td>{inv.id}</td>
						<td>{inv.issuedAt}</td>
						<td>{inv.paidAt ?? '—'}</td>
						<td>{inv.total}</td>
						<td>
							<Tag variant={invoiceTagVariant(inv.status)} label={inv.status} />
							<span class="chevron">{expandedId === inv.id ? '−' : '+'}</span>
						</td>
					</tr>
					{#if expandedId === inv.id}
						<tr>
							<td colspan="5" style="padding: 0">
								<div class="invoice-detail">
									<div class="invoice-detail-col">
										<span class="endpoint-panel-label">{i18n.t('payments.payment')}</span>
										<div class="kv" style="grid-template-columns: 1fr 1fr">
											<div><span class="k">{i18n.t('payments.method')}</span><span class="v" style="font-size: 15px">{inv.method}</span></div>
											<div><span class="k">{i18n.t('payments.invoiceNumber')}</span><span class="v" style="font-size: 15px">{inv.nfNumero}</span></div>
										</div>
										<div class="row" style="margin-top: 10px">
											<Button variant="ghost">{i18n.t('payments.downloadInvoice')}</Button>
											{#if inv.status === 'Pendente'}
												<Button variant="primary" onClick={() => payNow(inv.id)}>{i18n.t('payments.payNow')}</Button>
											{/if}
										</div>
									</div>
									<div class="invoice-detail-col">
										<span class="endpoint-panel-label">{i18n.t('payments.breakdown')}</span>
										<div class="invoice-breakdown">
											{#each inv.breakdown as b (b.label)}
												<div class="invoice-breakdown-row"><span>{b.label}</span><span>{b.value}</span></div>
											{/each}
											<div class="invoice-breakdown-row"><span>{i18n.t('payments.total')}</span><span>{inv.total}</span></div>
										</div>
									</div>
								</div>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</PortalShell>
