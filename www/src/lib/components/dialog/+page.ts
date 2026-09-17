import type { Snippet } from 'svelte';

export interface DialogProps {
	open: boolean;
	title: string;
	onClose: () => void;
	children?: Snippet;
	actions?: Snippet;
}

export function handleBackdropClick(event: MouseEvent, onClose: () => void): void {
	if (event.target === event.currentTarget) onClose();
}
