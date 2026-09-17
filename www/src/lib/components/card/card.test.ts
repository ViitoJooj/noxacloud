import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/svelte';
import Card from './card.svelte';

describe('Card', () => {
	it('renders the title and body', () => {
		const { getByText } = render(Card, {
			props: { title: 'Ambientes isolados', body: 'Cada cliente roda em seu próprio ambiente.' }
		});
		expect(getByText('Ambientes isolados')).toBeTruthy();
		expect(getByText('Cada cliente roda em seu próprio ambiente.')).toBeTruthy();
	});

	it('omits the kicker and meta elements when not provided', () => {
		const { container } = render(Card, { props: { title: 'T', body: 'B' } });
		expect(container.querySelector('.card-kicker')).toBeNull();
		expect(container.querySelector('.card-meta')).toBeNull();
	});

	it('renders the kicker and meta when provided', () => {
		const { getByText } = render(Card, { props: { title: 'T', body: 'B', kicker: 'K', meta: 'M' } });
		expect(getByText('K')).toBeTruthy();
		expect(getByText('M')).toBeTruthy();
	});
});
