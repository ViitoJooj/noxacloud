export type TagVariant = 'accent' | 'accent-2' | 'neutral' | 'outline';

export interface TagProps {
	variant?: TagVariant;
	label: string;
}

export function tagClass(variant: TagVariant): string {
	return `tag tag-${variant}`;
}
