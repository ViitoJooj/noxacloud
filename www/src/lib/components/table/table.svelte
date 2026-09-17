<script lang="ts" generics="Row extends Record<string, unknown>">
	import "./styles.scss"
	import type { TableColumn } from './+page';

	let {
		columns,
		rows,
		getRowId
	}: {
		columns: TableColumn<Row>[];
		rows: Row[];
		getRowId: (row: Row) => string;
	} = $props();
</script>

<table class="table">
	<thead>
		<tr>
			{#each columns as column (column.key)}
				<th>{column.header}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each rows as row (getRowId(row))}
			<tr>
				{#each columns as column (column.key)}
					<td>{String(row[column.key])}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>