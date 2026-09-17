import type { Snippet } from 'svelte';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'icon';

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	disabled?: boolean;
	type?: 'button' | 'submit';
	block?: boolean;
	href?: string;
	onClick?: (event: MouseEvent) => void;
	children?: Snippet;
}

export function buttonClass(variant: ButtonVariant, size: ButtonSize, block: boolean): string {
	const classes = ['btn', `btn-${variant}`];
	if (size === 'icon') classes.push('btn-icon');
	if (block) classes.push('btn-block');
	return classes.join(' ');
}
