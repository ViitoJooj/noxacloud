import type { PriceOption, PricesContent } from '$lib/prices/pricesService';

export interface PricesSelection {
	tipo: string;
	recursos: string[];
	integracoes: string[];
	infra: string;
	orquestracao: string;
	local: string;
	prazo: string;
	dominio: string;
}

export interface Estimate {
	setup: number;
	infraMonthly: number;
	monthlyService: number;
	totalMonthly: number;
	infraLabel: string;
	setupText: string;
	infraMonthlyText: string;
	monthlyText: string;
	totalMonthlyText: string;
}

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
	style: 'currency',
	currency: 'BRL',
	maximumFractionDigits: 0
});

export function formatCurrency(value: number): string {
	return currencyFormatter.format(value);
}

export function defaultSelection(content: PricesContent): PricesSelection {
	return {
		tipo: content.tipoOptions[0].id,
		recursos: [],
		integracoes: [],
		infra: content.infraOptions[0].id,
		orquestracao: content.orquestracaoOptions[0].id,
		local: content.localOptions[0].id,
		prazo: content.prazoOptions[0].id,
		dominio: content.dominioOptions[0].id
	};
}

function findOption(options: PriceOption[], id: string): PriceOption | undefined {
	return options.find((option) => option.id === id);
}

function sumSetup(options: PriceOption[], ids: string[]): number {
	return ids.reduce((total, id) => total + (findOption(options, id)?.setup ?? 0), 0);
}

function sumMonthly(options: PriceOption[], ids: string[]): number {
	return ids.reduce((total, id) => total + (findOption(options, id)?.monthly ?? 0), 0);
}

export function computeEstimate(content: PricesContent, selection: PricesSelection): Estimate {
	const tipo = findOption(content.tipoOptions, selection.tipo);
	const infra = findOption(content.infraOptions, selection.infra);
	const orquestracao = findOption(content.orquestracaoOptions, selection.orquestracao);
	const local = findOption(content.localOptions, selection.local);
	const prazo = findOption(content.prazoOptions, selection.prazo);
	const dominio = findOption(content.dominioOptions, selection.dominio);

	const baseSetup = (tipo?.setup ?? 0) + sumSetup(content.recursoOptions, selection.recursos);
	const prazoMultiplier = 1 + (prazo?.setup ?? 0);
	const setup = Math.round(baseSetup * prazoMultiplier);

	const infraMonthly = infra?.monthly ?? 0;
	const monthlyService =
		(tipo?.monthly ?? 0) +
		sumMonthly(content.integracaoOptions, selection.integracoes) +
		(orquestracao?.monthly ?? 0) +
		(local?.monthly ?? 0) +
		(dominio?.monthly ?? 0);
	const totalMonthly = infraMonthly + monthlyService;

	return {
		setup,
		infraMonthly,
		monthlyService,
		totalMonthly,
		infraLabel: infra?.label ?? '',
		setupText: formatCurrency(setup),
		infraMonthlyText: formatCurrency(infraMonthly),
		monthlyText: formatCurrency(monthlyService),
		totalMonthlyText: formatCurrency(totalMonthly)
	};
}

export function toggleInList(list: string[], id: string): string[] {
	return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}
