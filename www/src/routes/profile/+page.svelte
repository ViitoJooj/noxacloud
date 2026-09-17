<script lang="ts">
	import './styles.scss';
	import { i18n } from '$lib/i18n/store.svelte';
	import Field from '$lib/components/field/field.svelte';
	import Button from '$lib/components/button/button.svelte';
	import Tag from '$lib/components/tag/tag.svelte';
	import PortalShell from '$lib/components/portal-shell/portal-shell.svelte';
	import { settingsNavGroup } from '$lib/components/portal-shell/+page';
	import {
		initialProfileForm,
		validateProfileForm,
		emptyPasswordForm,
		validatePasswordForm,
		type ProfileErrors,
		type PasswordErrors
	} from './page';

	let form = $state(initialProfileForm());
	let errors: ProfileErrors = $state({});
	let saved = $state(false);

	let passwordForm = $state(emptyPasswordForm());
	let passwordErrors: PasswordErrors = $state({});
	let passwordChanged = $state(false);

	function handleSaveProfile(event: SubmitEvent) {
		event.preventDefault();
		const foundErrors = validateProfileForm(form);
		errors = foundErrors;
		saved = Object.keys(foundErrors).length === 0;
	}

	function handleChangePassword(event: SubmitEvent) {
		event.preventDefault();
		const foundErrors = validatePasswordForm(passwordForm);
		passwordErrors = foundErrors;
		if (Object.keys(foundErrors).length > 0) return;
		passwordChanged = true;
		passwordForm = emptyPasswordForm();
	}

	const navGroups = $derived([settingsNavGroup((key) => i18n.t(key))]);
</script>

<PortalShell groups={navGroups} activeHref="/profile">
	<h1>{i18n.t('profile.title')}</h1>
	<p class="lead">{i18n.t('profile.subtitle')}</p>

	<form class="panel" onsubmit={handleSaveProfile} novalidate>
		<h3>{i18n.t('profile.dataHeading')}</h3>
		<Field
			label={i18n.t('profile.nameLabel')}
			name="nome"
			bind:value={form.nome}
			error={errors.nome ?? ''}
			required
		/>
		<Field
			type="email"
			label={i18n.t('profile.emailLabel')}
			name="email"
			bind:value={form.email}
			error={errors.email ?? ''}
			required
		/>
		<Field label={i18n.t('profile.phoneLabel')} name="telefone" bind:value={form.telefone} />

		<hr class="caption-rule" style="margin-top: 24px" />

		<h3>{i18n.t('profile.businessHeading')}</h3>
		<Field
			label={i18n.t('profile.businessNameLabel')}
			name="negocio"
			bind:value={form.negocio}
		/>
		<Field label={i18n.t('profile.cnpjLabel')} name="cnpj" bind:value={form.cnpj} />

		<div class="row" style="margin-top: 12px">
			<Button type="submit">{i18n.t('profile.save')}</Button>
			{#if saved}
				<Tag variant="accent" label={i18n.t('profile.saved')} />
			{/if}
		</div>
	</form>

	<form class="panel" onsubmit={handleChangePassword} novalidate>
		<h3>{i18n.t('profile.passwordHeading')}</h3>
		<Field
			type="password"
			label={i18n.t('profile.newPasswordLabel')}
			name="password"
			bind:value={passwordForm.password}
			placeholder="••••••••"
			error={passwordErrors.password ?? ''}
		/>
		<Field
			type="password"
			label={i18n.t('profile.confirmPasswordLabel')}
			name="confirmPassword"
			bind:value={passwordForm.confirmPassword}
			placeholder="••••••••"
			error={passwordErrors.confirmPassword ?? ''}
		/>
		<div class="row">
			<Button type="submit" variant="secondary">{i18n.t('profile.changePassword')}</Button>
			{#if passwordChanged}
				<Tag variant="accent" label={i18n.t('profile.saved')} />
			{/if}
		</div>
	</form>
</PortalShell>
