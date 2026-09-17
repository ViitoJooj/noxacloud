export type InvoiceStatus = 'Pago' | 'Pendente';

export interface InvoiceBreakdownItem {
	label: string;
	value: string;
}

export interface Invoice {
	id: string;
	ref: string;
	desc: string;
	total: string;
	status: InvoiceStatus;
	issuedAt: string;
	paidAt: string | null;
	method: string;
	nfNumero: string;
	breakdown: InvoiceBreakdownItem[];
}

export function initialInvoices(): Invoice[] {
	return [
		{
			id: 'fat_2026_09',
			ref: 'Set/2026',
			desc: 'Assinatura mensal',
			total: 'R$ 1.320,00',
			status: 'Pago',
			issuedAt: '01/09/2026 03:00',
			paidAt: '02/09/2026 09:14',
			method: 'PIX recorrente',
			nfNumero: 'NF-e 000482',
			breakdown: [
				{ label: 'Infraestrutura (Azure)', value: 'R$ 320,00' },
				{ label: 'Roteamento (Cloudflare)', value: 'R$ 25,00' },
				{ label: 'Taxa de serviço', value: 'R$ 665,00' },
				{ label: 'Manutenção e ajustes', value: 'R$ 200,00' },
				{ label: 'Feature: Agendamento online', value: 'R$ 110,00' }
			]
		},
		{
			id: 'fat_2026_08',
			ref: 'Ago/2026',
			desc: 'Assinatura mensal',
			total: 'R$ 1.320,00',
			status: 'Pago',
			issuedAt: '01/08/2026 03:00',
			paidAt: '01/08/2026 14:52',
			method: 'PIX recorrente',
			nfNumero: 'NF-e 000451',
			breakdown: [
				{ label: 'Infraestrutura (Azure)', value: 'R$ 320,00' },
				{ label: 'Roteamento (Cloudflare)', value: 'R$ 25,00' },
				{ label: 'Taxa de serviço', value: 'R$ 665,00' },
				{ label: 'Manutenção e ajustes', value: 'R$ 200,00' },
				{ label: 'Feature: Agendamento online', value: 'R$ 110,00' }
			]
		},
		{
			id: 'fat_2026_10',
			ref: 'Out/2026',
			desc: 'Assinatura mensal (próxima)',
			total: 'R$ 1.320,00',
			status: 'Pendente',
			issuedAt: '01/10/2026 03:00',
			paidAt: null,
			method: 'PIX recorrente',
			nfNumero: '—',
			breakdown: [
				{ label: 'Infraestrutura (Azure)', value: 'R$ 320,00' },
				{ label: 'Roteamento (Cloudflare)', value: 'R$ 25,00' },
				{ label: 'Taxa de serviço', value: 'R$ 665,00' },
				{ label: 'Manutenção e ajustes', value: 'R$ 200,00' },
				{ label: 'Feature: Agendamento online', value: 'R$ 110,00' }
			]
		}
	];
}

export function invoiceTagVariant(status: InvoiceStatus): 'accent' | 'outline' {
	return status === 'Pago' ? 'accent' : 'outline';
}

export interface AutoPaymentForm {
	nome: string;
	numero: string;
	validade: string;
	cvv: string;
}

export function emptyAutoPaymentForm(): AutoPaymentForm {
	return { nome: '', numero: '', validade: '', cvv: '' };
}

export function maskAutoPayment(form: AutoPaymentForm): AutoPaymentForm {
	const digits = form.numero.replace(/\D/g, '');
	const last4 = digits.slice(-4);
	return {
		nome: '••••• •••••',
		numero: '•••• •••• •••• ' + (last4 || '••••'),
		validade: '••/••',
		cvv: '•••'
	};
}
