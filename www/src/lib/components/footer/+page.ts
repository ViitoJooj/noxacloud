export function copyrightText(template: string, year: number): string {
	return template.replace('{year}', String(year));
}

export function currentYear(): number {
	return new Date().getFullYear();
}
