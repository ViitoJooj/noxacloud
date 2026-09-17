import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Tag from './tag.svelte';

describe('Tag', () => {
	it('renders the label', () => {
		const { getByText } = render(Tag, { props: { label: 'Beta' } });
		expect(getByText('Beta')).toBeTruthy();
	});

	it('defaults to the neutral variant', () => {
		const { getByText } = render(Tag, { props: { label: 'Beta' } });
		expect(getByText('Beta').className).toContain('tag-neutral');
	});

	it('applies the requested variant class', () => {
		const { getByText } = render(Tag, { props: { label: 'Beta', variant: 'accent-2' } });
		expect(getByText('Beta').className).toContain('tag-accent-2');
	});
});
