<script lang="ts">
	import "./styles.scss"
	import { buttonClass, type ButtonProps } from './+page';

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		type = 'button',
		block = false,
		href,
		onClick,
		children
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		{href}
		class={buttonClass(variant, size, block)}
		aria-disabled={disabled}
		onclick={(event) => { if (disabled) event.preventDefault(); else onClick?.(event); }}
	>
		{@render children?.()}
	</a>
{:else}
	<button {type} class={buttonClass(variant, size, block)} {disabled} onclick={onClick}>
		{@render children?.()}
	</button>
{/if}