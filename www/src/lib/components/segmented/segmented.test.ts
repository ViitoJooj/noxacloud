import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Segmented from './segmented.svelte';

const options = [
	{ value: 'a', label: 'Option A' },
	{ value: 'b', label: 'Option B' }
];

describe('Segmented', () => {
	it('renders every option label', () => {
		const { getByText } = render(Segmented, { props: { name: 'g', options, selected: 'a' } });
		expect(getByText('Option A')).toBeTruthy();
		expect(getByText('Option B')).toBeTruthy();
	});

	it('marks the selected option as checked', () => {
		const { getByLabelText } = render(Segmented, { props: { name: 'g', options, selected: 'b' } });
		expect((getByLabelText('Option B') as HTMLInputElement).checked).toBe(true);
		expect((getByLabelText('Option A') as HTMLInputElement).checked).toBe(false);
	});

	it('calls onSelect with the newly chosen value', async () => {
		const onSelect = vi.fn();
		const { getByLabelText } = render(Segmented, {
			props: { name: 'g', options, selected: 'a', onSelect }
		});
		await fireEvent.click(getByLabelText('Option B'));
		expect(onSelect).toHaveBeenCalledWith('b');
	});
});
