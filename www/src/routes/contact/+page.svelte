<script lang="ts">
	import "./styles.scss"
	import { i18n } from '$lib/i18n/store.svelte';
	import Field from '$lib/components/field/field.svelte';
	import Button from '$lib/components/button/button.svelte';
	import {
		contactService,
		emptyContactForm,
		supportTypeOptions,
		toPayload,
		validateContactForm,
		type ContactErrors
	} from './page';

	let form = $state(emptyContactForm());
	let errors: ContactErrors = $state({});
	let submitted = $state(false);
	let submitting = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const foundErrors = validateContactForm(form);
		errors = foundErrors;
		if (Object.keys(foundErrors).length > 0) return;
		submitting = true;
		const result = await contactService.submit(toPayload(form));
		submitting = false;
		if (result.ok) submitted = true;
	}
</script>

<section class="contact-hero">
	<span class="kicker">{i18n.t('contact.kicker')}</span>
	<hr class="caption-rule" />
	<h1>{i18n.t('contact.title')}</h1>
	<p class="contact-sub">{i18n.t('contact.subtitle')}</p>
</section>

<section class="contact-grid">
	{#if submitted}
		<div class="contact-success">
			<h3>{i18n.t('contact.success.title')}</h3>
			<p>{i18n.t('contact.success.body')}</p>
		</div>
	{:else}
		<div class="contact-form-card">
			<h3>{i18n.t('contact.form.heading')}</h3>
			<form onsubmit={handleSubmit} novalidate>
				<Field
					label={i18n.t('contact.form.firstNameLabel')}
					name="firstName"
					bind:value={form.firstName}
					placeholder={i18n.t('contact.form.firstNamePlaceholder')}
					error={errors.firstName ?? ''}
					required
				/>
				<Field
					label={i18n.t('contact.form.lastNameLabel')}
					name="lastName"
					bind:value={form.lastName}
					placeholder={i18n.t('contact.form.lastNamePlaceholder')}
					error={errors.lastName ?? ''}
					required
				/>
				<Field
					type="email"
					label={i18n.t('contact.form.emailLabel')}
					name="email"
					bind:value={form.email}
					placeholder={i18n.t('contact.form.emailPlaceholder')}
					error={errors.email ?? ''}
					required
				/>
				<Field
					label={i18n.t('contact.form.phoneLabel')}
					name="phone"
					bind:value={form.phone}
					placeholder={i18n.t('contact.form.phonePlaceholder')}
				/>
				<Field
					type="select"
					label={i18n.t('contact.form.supportTypeLabel')}
					name="supportType"
					bind:value={form.supportType}
					placeholder={i18n.t('contact.form.supportTypePlaceholder')}
					options={supportTypeOptions()}
					error={errors.supportType ?? ''}
					required
				/>
				<Field
					type="textarea"
					label={i18n.t('contact.form.messageLabel')}
					name="message"
					bind:value={form.message}
					placeholder={i18n.t('contact.form.messagePlaceholder')}
					error={errors.message ?? ''}
					required
				/>
				<Button type="submit" disabled={submitting} block>
					{submitting ? i18n.t('contact.form.submitting') : i18n.t('contact.form.submit')}
				</Button>
			</form>
		</div>
	{/if}

	<div class="contact-direct">
		<div class="contact-direct-item">
			<h3>{i18n.t('contact.cards.commercial.title')}</h3>
			<p>{i18n.t('contact.cards.commercial.desc')}</p>
			<a href={`mailto:${i18n.t('contact.cards.commercial.email')}`}>{i18n.t('contact.cards.commercial.email')}</a>
		</div>
		<div class="contact-direct-item">
			<h3>{i18n.t('contact.cards.support.title')}</h3>
			<p>{i18n.t('contact.cards.support.desc')}</p>
			<a href="/login">{i18n.t('contact.cards.support.linkLabel')}</a>
		</div>
		<div class="contact-direct-item">
			<h3>{i18n.t('contact.cards.financial.title')}</h3>
			<p>{i18n.t('contact.cards.financial.desc')}</p>
			<a href={`mailto:${i18n.t('contact.cards.financial.email')}`}>{i18n.t('contact.cards.financial.email')}</a>
		</div>
		<div class="contact-direct-item">
			<h3>{i18n.t('contact.cards.general.title')}</h3>
			<p>{i18n.t('contact.cards.general.desc')}</p>
			<a href={`mailto:${i18n.t('contact.cards.general.email')}`}>{i18n.t('contact.cards.general.email')}</a>
		</div>
	</div>
</section>
