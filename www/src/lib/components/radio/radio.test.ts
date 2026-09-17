import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Radio from './radio.svelte';

describe('Radio', () => {
	it('renders its label', () => {
		const { getByLabelText } = render(Radio, { props: { name: 'g', value: 'a', label: 'Option A' } });
		expect(getByLabelText('Option A')).toBeTruthy();
	});

	it('reflects the checked prop', () => {
		const { getByLabelText } = render(Radio, {
			props: { name: 'g', value: 'a', label: 'Option A', checked: true }
		});
		expect((getByLabelText('Option A') as HTMLInputElement).checked).toBe(true);
	});

	it('calls onChange with its value when selected', async () => {
		const onChange = vi.fn();
		const { getByLabelText } = render(Radio, {
			props: { name: 'g', value: 'a', label: 'Option A', onChange }
		});
		await fireEvent.click(getByLabelText('Option A'));
		expect(onChange).toHaveBeenCalledWith('a');
	});
});
