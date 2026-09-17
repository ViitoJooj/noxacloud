<script lang="ts">
	import "./styles.scss"
	import type { SectionHeadingProps } from './+page';

	let { kicker, title, lead = '' }: SectionHeadingProps = $props();
</script>

<span class="kicker">{kicker}</span>
<hr class="caption-rule" />
<h2 class="section-h2">{title}</h2>
{#if lead}
	<p class="section-lead">{lead}</p>
{/if}
