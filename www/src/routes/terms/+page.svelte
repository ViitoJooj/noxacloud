<script lang="ts">
import "./styles.scss"
	import { i18n } from '$lib/i18n/store.svelte';
	import { termsSections } from './page';

	const sections = $derived(termsSections(i18n.locale));

	function slug(title: string) {
		return title
			.normalize('NFD')
			.replace(/[̀-ͯ]/g, '')
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)/g, '');
	}
</script>

<section class="terms-hero">
	<h1>{i18n.t('terms.title')}</h1>
	<p class="terms-sub">{i18n.t('terms.subtitle')}</p>
</section>

<div class="legal-layout">
	<nav class="legal-sidebar">
		{#each sections as section (section.title)}
			<a href={`#${slug(section.title)}`}>{section.title}</a>
		{/each}
	</nav>
	<article class="legal-main">
		{#each sections as section (section.title)}
			<section class="legal-section" id={slug(section.title)}>
				<h3>{section.title}</h3>
				{#each section.subsections as subsection (subsection.heading)}
					<h4>{subsection.heading}</h4>
					{#each subsection.blocks as block, i (i)}
						{#if block.p}
							<p>{block.p}</p>
						{:else if block.list}
							<ul class="legal-sublist">
								{#each block.list as item (item)}
									<li>{item}</li>
								{/each}
							</ul>
						{/if}
					{/each}
				{/each}
			</section>
		{/each}
	</article>
</div>