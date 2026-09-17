import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Button from './button.svelte';

describe('Button', () => {
	it('applies the primary variant class by default', () => {
		const { getByRole } = render(Button);
		expect(getByRole('button').className).toContain('btn-primary');
	});

	it('applies the requested variant and size classes', () => {
		const { getByRole } = render(Button, { props: { variant: 'ghost', size: 'icon' } });
		const el = getByRole('button');
		expect(el.className).toContain('btn-ghost');
		expect(el.className).toContain('btn-icon');
	});

	it('disables the button when disabled is true', () => {
		const { getByRole } = render(Button, { props: { disabled: true } });
		expect(getByRole('button').hasAttribute('disabled')).toBe(true);
	});

	it('calls onClick when clicked', async () => {
		const onClick = vi.fn();
		const { getByRole } = render(Button, { props: { onClick } });
		await fireEvent.click(getByRole('button'));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('renders as a link when href is provided', () => {
		const { getByRole } = render(Button, { props: { href: '/login' } });
		const link = getByRole('link');
		expect(link.getAttribute('href')).toBe('/login');
		expect(link.className).toContain('btn-primary');
	});

	it('calls onClick when the href-rendered link is clicked', async () => {
		const onClick = vi.fn();
		const { getByRole } = render(Button, { props: { href: '/login', onClick } });
		await fireEvent.click(getByRole('link'));
		expect(onClick).toHaveBeenCalledOnce();
	});

	it('does not call onClick when the href-rendered link is disabled and clicked', async () => {
		const onClick = vi.fn();
		const { getByRole } = render(Button, {
			props: { href: '/login', onClick, disabled: true }
		});
		await fireEvent.click(getByRole('link'));
		expect(onClick).not.toHaveBeenCalled();
	});
});
