<script lang="ts">
	import "./styles.scss"
	import type { CardProps } from './+page';

	let { kicker = '', title, body, meta = '' }: CardProps = $props();
</script>

<div class="card">
	{#if kicker}
		<span class="card-kicker">{kicker}</span>
	{/if}
	<h3 class="card-title">{title}</h3>
	<p class="card-body">{body}</p>
	{#if meta}
		<span class="card-meta">{meta}</span>
	{/if}
</div>
