<script lang="ts">
	import "./styles.scss"
	import { inputId, type FieldProps } from './+page';

	let {
		type = 'text',
		label,
		name,
		value = $bindable(''),
		placeholder = '',
		error = '',
		required = false,
		disabled = false,
		options = []
	}: FieldProps = $props();

	const id = $derived(inputId(name));
</script>

<div class="field">
	<label for={id}>{label}</label>
	{#if type === 'textarea'}
		<textarea {id} {name} {placeholder} {required} {disabled} class="input" bind:value></textarea>
	{:else if type === 'select'}
		<select {id} {name} {required} {disabled} class="input" bind:value>
			<option value="" disabled>{placeholder}</option>
			{#each options as option (option.value)}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
	{:else}
		<input {id} {name} {type} {placeholder} {required} {disabled} class="input" bind:value />
	{/if}
	{#if error}
		<p class="field-error">{error}</p>
	{/if}
</div>

