<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Field from '$lib/components/field/field.svelte';
	import Button from '$lib/components/button/button.svelte';
	import {
		authService,
		emptyLoginForm,
		toLoginPayload,
		validateLoginForm,
		type LoginErrors
	} from './page';

	let form = $state(emptyLoginForm());
	let errors: LoginErrors = $state({});
	let submitted = $state(false);
	let submitting = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const foundErrors = validateLoginForm(form);
		errors = foundErrors;
		if (Object.keys(foundErrors).length > 0) return;
		submitting = true;
		const result = await authService.login(toLoginPayload(form));
		submitting = false;
		if (result.ok) submitted = true;
	}
</script>

<section class="auth-shell">
	{#if submitted}
		<div class="auth-card">
			<h1>{i18n.t('login.success.title')}</h1>
			<p>{i18n.t('login.success.body')}</p>
		</div>
	{:else}
		<div class="auth-card">
			<h1>{i18n.t('login.title')}</h1>
			<p class="lead">{i18n.t('login.lead')}</p>
			<form onsubmit={handleSubmit} novalidate>
				<Field
					type="email"
					label={i18n.t('login.emailLabel')}
					name="email"
					bind:value={form.email}
					placeholder={i18n.t('login.emailPlaceholder')}
					error={errors.email ?? ''}
					required
				/>
				<Field
					type="password"
					label={i18n.t('login.passwordLabel')}
					name="password"
					bind:value={form.password}
					placeholder={i18n.t('login.passwordPlaceholder')}
					error={errors.password ?? ''}
					required
				/>
				<Button type="submit" disabled={submitting} block>
					{submitting ? i18n.t('login.submitting') : i18n.t('login.submit')}
				</Button>
			</form>
			<p class="auth-foot">
				{i18n.t('login.footerText')}
				<a href="/register">{i18n.t('login.footerLink')}</a>
			</p>
		</div>
	{/if}
</section>
