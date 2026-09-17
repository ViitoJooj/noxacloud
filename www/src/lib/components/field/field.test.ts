import { describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Field from './field.svelte';

describe('Field', () => {
	it('links the label to the input via id', () => {
		const { getByLabelText } = render(Field, { props: { label: 'Email', name: 'email' } });
		expect(getByLabelText('Email')).toBeTruthy();
	});

	it('renders a textarea when type is textarea', () => {
		const { getByLabelText } = render(Field, { props: { label: 'Bio', name: 'bio', type: 'textarea' } });
		expect(getByLabelText('Bio').tagName).toBe('TEXTAREA');
	});

	it('shows the error message when provided', () => {
		const { getByText } = render(Field, { props: { label: 'Email', name: 'email', error: 'Required' } });
		expect(getByText('Required')).toBeTruthy();
	});

	it('updates its value when the user types', async () => {
		const { getByLabelText } = render(Field, { props: { label: 'Email', name: 'email' } });
		const input = getByLabelText('Email') as HTMLInputElement;
		await fireEvent.input(input, { target: { value: 'a@b.com' } });
		expect(input.value).toBe('a@b.com');
	});

	it('renders a select with the given options when type is select', () => {
		const options = [
			{ value: 'a', label: 'Option A' },
			{ value: 'b', label: 'Option B' }
		];
		const { getByLabelText, getByText } = render(Field, {
			props: { label: 'Category', name: 'category', type: 'select', options, placeholder: 'Choose' }
		});
		const select = getByLabelText('Category') as HTMLSelectElement;
		expect(select.tagName).toBe('SELECT');
		expect(getByText('Option A')).toBeTruthy();
		expect(getByText('Option B')).toBeTruthy();
	});

	it('updates the bound value when a select option is chosen', async () => {
		const options = [
			{ value: 'a', label: 'Option A' },
			{ value: 'b', label: 'Option B' }
		];
		const { getByLabelText } = render(Field, {
			props: { label: 'Category', name: 'category', type: 'select', options, placeholder: 'Choose' }
		});
		const select = getByLabelText('Category') as HTMLSelectElement;
		await fireEvent.change(select, { target: { value: 'b' } });
		expect(select.value).toBe('b');
	});
});
