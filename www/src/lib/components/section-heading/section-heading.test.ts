import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import SectionHeading from './section-heading.svelte';

describe('SectionHeading', () => {
	it('renders the kicker and title', () => {
		const { getByText } = render(SectionHeading, { props: { kicker: 'Kicker', title: 'Title' } });
		expect(getByText('Kicker')).toBeTruthy();
		expect(getByText('Title')).toBeTruthy();
	});

	it('renders the title as an h2 with the section-h2 class', () => {
		const { getByText } = render(SectionHeading, { props: { kicker: 'Kicker', title: 'Title' } });
		const heading = getByText('Title');
		expect(heading.tagName).toBe('H2');
		expect(heading.className).toContain('section-h2');
	});

	it('renders the lead paragraph when provided', () => {
		const { getByText } = render(SectionHeading, {
			props: { kicker: 'Kicker', title: 'Title', lead: 'Lead text' }
		});
		expect(getByText('Lead text')).toBeTruthy();
	});

	it('omits the lead paragraph when not provided', () => {
		const { queryByText } = render(SectionHeading, { props: { kicker: 'Kicker', title: 'Title' } });
		expect(queryByText('Lead text')).toBeNull();
	});
});
