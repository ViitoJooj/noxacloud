<script lang="ts">
	import "./styles.scss"
	import { handleSelect, type SegmentedProps } from './+page';

	let { name, options, selected, onSelect }: SegmentedProps = $props();
</script>

<div class="seg">
	{#each options as option (option.value)}
		<label class="seg-opt">
			<input
				type="radio"
				{name}
				value={option.value}
				checked={option.value === selected}
				onchange={(event) => handleSelect(event, onSelect)}
			/>
			{option.label}
		</label>
	{/each}
</div>