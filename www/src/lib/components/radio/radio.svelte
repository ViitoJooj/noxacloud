<script lang="ts">
	import "./styles.scss"
	import { handleChange, type RadioProps } from './+page';

	let { name, value, label, checked = false, onChange }: RadioProps = $props();
</script>

<label class="radio">
	<input
		type="radio"
		{name}
		{value}
		{checked}
		onchange={(event) => handleChange(event, value, onChange)}
	/>
	<span class="dot"></span>
	{label}
</label>