<script lang="ts">
	import "./styles.scss"
	import { handleBackdropClick, type DialogProps } from './+page';

	let { open, title, onClose, children, actions }: DialogProps = $props();
</script>

{#if open}
	<div class="dialog-backdrop" onclick={(event) => handleBackdropClick(event, onClose)}>
		<div class="dialog" role="dialog" aria-modal="true" aria-label={title}>
			<h2 class="dialog-title">{title}</h2>
			<div class="dialog-body">
				{@render children?.()}
			</div>
			{#if actions}
				<div class="dialog-actions">
					{@render actions()}
				</div>
			{/if}
		</div>
	</div>
{/if}