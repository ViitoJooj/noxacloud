export interface RadioProps {
	name: string;
	value: string;
	label: string;
	checked?: boolean;
	onChange?: (value: string) => void;
}

export function handleChange(event: Event, value: string, onChange?: (value: string) => void): void {
	const target = event.currentTarget as HTMLInputElement;
	if (target.checked) onChange?.(value);
}
