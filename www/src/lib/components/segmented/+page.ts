export interface SegmentedOption {
	value: string;
	label: string;
}

export interface SegmentedProps {
	name: string;
	options: SegmentedOption[];
	selected: string;
	onSelect?: (value: string) => void;
}

export function handleSelect(event: Event, onSelect?: (value: string) => void): void {
	const target = event.currentTarget as HTMLInputElement;
	if (target.checked) onSelect?.(target.value);
}
