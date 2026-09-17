<script lang="ts">
	import "./styles.scss"
	import { tagClass, type TagProps } from './+page';

	let { variant = 'neutral', label }: TagProps = $props();
</script>

<span class={tagClass(variant)}>{label}</span>
