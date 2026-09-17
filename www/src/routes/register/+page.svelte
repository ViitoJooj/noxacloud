<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Field from '$lib/components/field/field.svelte';
	import Button from '$lib/components/button/button.svelte';
	import {
		authService,
		emptyRegisterForm,
		toRegisterPayload,
		validateRegisterForm,
		type RegisterErrors
	} from './page';

	let form = $state(emptyRegisterForm());
	let errors: RegisterErrors = $state({});
	let submitted = $state(false);
	let submitting = $state(false);

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		const foundErrors = validateRegisterForm(form);
		errors = foundErrors;
		if (Object.keys(foundErrors).length > 0) return;
		submitting = true;
		const result = await authService.register(toRegisterPayload(form));
		submitting = false;
		if (result.ok) submitted = true;
	}
</script>

<section class="auth-shell">
	{#if submitted}
		<div class="auth-card">
			<h1>{i18n.t('register.success.title')}</h1>
			<p>{i18n.t('register.success.body')}</p>
		</div>
	{:else}
		<div class="auth-card">
			<h1>{i18n.t('register.title')}</h1>
			<p class="lead">{i18n.t('register.lead')}</p>
			<form onsubmit={handleSubmit} novalidate>
				<Field
					label={i18n.t('register.nameLabel')}
					name="name"
					bind:value={form.name}
					placeholder={i18n.t('register.namePlaceholder')}
					error={errors.name ?? ''}
					required
				/>
				<Field
					type="email"
					label={i18n.t('register.emailLabel')}
					name="email"
					bind:value={form.email}
					placeholder={i18n.t('register.emailPlaceholder')}
					error={errors.email ?? ''}
					required
				/>
				<Field
					type="password"
					label={i18n.t('register.passwordLabel')}
					name="password"
					bind:value={form.password}
					placeholder={i18n.t('register.passwordPlaceholder')}
					error={errors.password ?? ''}
					required
				/>
				<Field
					type="password"
					label={i18n.t('register.confirmPasswordLabel')}
					name="confirmPassword"
					bind:value={form.confirmPassword}
					placeholder={i18n.t('register.passwordPlaceholder')}
					error={errors.confirmPassword ?? ''}
					required
				/>
				<Button type="submit" disabled={submitting} block>
					{submitting ? i18n.t('register.submitting') : i18n.t('register.submit')}
				</Button>
			</form>
			<p class="auth-foot">
				{i18n.t('register.footerText')}
				<a href="/login">{i18n.t('register.footerLink')}</a>
			</p>
		</div>
	{/if}
</section>
