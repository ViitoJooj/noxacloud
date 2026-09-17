import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Dialog from './dialog.svelte';

describe('Dialog', () => {
	it('renders nothing when closed', () => {
		const { queryByRole } = render(Dialog, { props: { open: false, title: 'Confirm', onClose: () => {} } });
		expect(queryByRole('dialog')).toBeNull();
	});

	it('renders the dialog with its title when open', () => {
		const { getByRole } = render(Dialog, { props: { open: true, title: 'Confirm', onClose: () => {} } });
		const dialog = getByRole('dialog');
		expect(dialog).toBeTruthy();
		expect(dialog.getAttribute('aria-label')).toBe('Confirm');
	});

	it('calls onClose when the backdrop is clicked', async () => {
		const onClose = vi.fn();
		const { getByRole } = render(Dialog, { props: { open: true, title: 'Confirm', onClose } });
		const backdrop = getByRole('dialog').parentElement as HTMLElement;
		await fireEvent.click(backdrop);
		expect(onClose).toHaveBeenCalledOnce();
	});

	it('does not call onClose when the dialog body itself is clicked', async () => {
		const onClose = vi.fn();
		const { getByRole } = render(Dialog, { props: { open: true, title: 'Confirm', onClose } });
		await fireEvent.click(getByRole('dialog'));
		expect(onClose).not.toHaveBeenCalled();
	});
});
