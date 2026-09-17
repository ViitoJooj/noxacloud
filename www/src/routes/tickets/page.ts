export type TicketStatus = 'Aberto' | 'Em andamento' | 'Resolvido';
export type TicketCategory = 'Bug' | 'Ajuste' | 'Dúvida';

export interface Ticket {
	id: number;
	title: string;
	category: TicketCategory;
	status: TicketStatus;
	date: string;
}

export function initialTickets(): Ticket[] {
	return [
		{ id: 1, title: 'Erro ao carregar catálogo de produtos', category: 'Bug', status: 'Aberto', date: '02/09/2026' },
		{
			id: 2,
			title: 'Ajustar cor do botão de finalizar pedido',
			category: 'Ajuste',
			status: 'Em andamento',
			date: '28/08/2026'
		},
		{
			id: 3,
			title: 'Dúvida sobre emissão de nota fiscal',
			category: 'Dúvida',
			status: 'Resolvido',
			date: '15/08/2026'
		}
	];
}

export const TICKET_CATEGORIES: TicketCategory[] = ['Bug', 'Ajuste', 'Dúvida'];

export function ticketTagVariant(status: TicketStatus): 'accent' | 'accent-2' | 'outline' {
	if (status === 'Resolvido') return 'accent';
	if (status === 'Em andamento') return 'accent-2';
	return 'outline';
}

export interface TicketDraft {
	title: string;
	category: TicketCategory;
	description: string;
}

export function emptyTicketDraft(): TicketDraft {
	return { title: '', category: 'Bug', description: '' };
}
