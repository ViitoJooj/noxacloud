export type FieldType = 'text' | 'email' | 'password' | 'textarea' | 'select';

export interface FieldOption {
	value: string;
	label: string;
}

export interface FieldProps {
	type?: FieldType;
	label: string;
	name: string;
	value?: string;
	placeholder?: string;
	error?: string;
	required?: boolean;
	disabled?: boolean;
	options?: FieldOption[];
}

export function inputId(name: string): string {
	return `field-${name}`;
}
