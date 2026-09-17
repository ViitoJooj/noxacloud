import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import type { Component } from 'svelte';
import UntypedTable from './table.svelte';
import type { TableColumn } from './+page';

interface Person extends Record<string, unknown> {
	id: string;
	name: string;
	age: number;
}

// @testing-library/svelte's `render` is itself a generic function, and
// assigning Table's `generics="Row extends ..."` type parameter into that
// context forces TypeScript to close it over its constraint
// (`Record<string, unknown>`) rather than infer `Row` from the props passed
// below. Casting to the concrete instantiation here is test-only: it does
// not change table.svelte's generic contract or how it type-checks for
// normal template usage (`<Table {columns} {rows} {getRowId} />`).
const Table = UntypedTable as Component<{
	columns: TableColumn<Person>[];
	rows: Person[];
	getRowId: (row: Person) => string;
}>;

const columns: TableColumn<Person>[] = [
	{ key: 'name', header: 'Name' },
	{ key: 'age', header: 'Age' }
];

const rows: Person[] = [
	{ id: '1', name: 'Ana', age: 30 },
	{ id: '2', name: 'Bruno', age: 25 }
];

describe('Table', () => {
	it('renders column headers', () => {
		const { getByText } = render(Table, { props: { columns, rows, getRowId: (r: Person) => r.id } });
		expect(getByText('Name')).toBeTruthy();
		expect(getByText('Age')).toBeTruthy();
	});

	it('renders every row cell', () => {
		const { getByText } = render(Table, { props: { columns, rows, getRowId: (r: Person) => r.id } });
		expect(getByText('Ana')).toBeTruthy();
		expect(getByText('Bruno')).toBeTruthy();
		expect(getByText('25')).toBeTruthy();
	});
});
