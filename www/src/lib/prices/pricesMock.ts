import type { PricesContent } from './pricesService';

export const LANDING_PAGE_ID = 'landing';

export const pricesMockPtBr: PricesContent = {
	tipoOptions: [
		{
			id: 'restaurante',
			label: 'Restaurante / Delivery',
			desc: 'Cardápio digital, pedidos e integração com entrega própria.',
			setup: 6000,
			monthly: 350
		},
		{
			id: 'agendamento',
			label: 'Agendamento de serviços',
			desc: 'Barbearia, salão, clínica, petshop: agenda de horários e profissionais.',
			setup: 5000,
			monthly: 300
		},
		{
			id: 'catalogo',
			label: 'Loja / Catálogo online',
			desc: 'Vitrine de produtos, estoque e checkout para venda direta.',
			setup: 5500,
			monthly: 320
		},
		{
			id: 'b2b',
			label: 'Distribuidora / Catálogo B2B',
			desc: 'Pedidos por atacado, tabelas de preço e condições por cliente.',
			setup: 7000,
			monthly: 400
		},
		{
			id: 'clinica',
			label: 'Clínica / Consultório',
			desc: 'Agenda de consultas, prontuário simples e lembretes.',
			setup: 5000,
			monthly: 300
		}
	],
	recursoOptions: [
		{
			id: LANDING_PAGE_ID,
			label: 'Landing page simples',
			desc: 'Página única institucional, sem os recursos abaixo.',
			setup: 0
		},
		{
			id: 'pedidos',
			label: 'Sistema de pedidos online',
			desc: 'Carrinho, checkout e acompanhamento de status.',
			setup: 1500
		},
		{
			id: 'agenda',
			label: 'Agendamento com calendário',
			desc: 'Calendário de horários e profissionais, com confirmação automática.',
			setup: 1200
		},
		{
			id: 'catalogo-produtos',
			label: 'Catálogo de produtos',
			desc: 'Listagem com categorias, busca e controle de estoque.',
			setup: 1000
		},
		{
			id: 'login-clientes',
			label: 'Login de clientes',
			desc: 'Cadastro, histórico de pedidos e dados salvos.',
			setup: 800
		},
		{
			id: 'painel-admin',
			label: 'Painel administrativo',
			desc: 'Gestão de pedidos, cadastros e relatórios internos.',
			setup: 1500
		}
	],
	integracaoOptions: [
		{
			id: 'whatsapp',
			label: 'WhatsApp Business API',
			desc: 'Notificações de pedido e atendimento automatizado.',
			monthly: 60
		},
		{
			id: 'pagamento',
			label: 'Gateway de pagamento (Pix/Cartão)',
			desc: 'Cobrança online integrada ao checkout.',
			monthly: 80
		},
		{
			id: 'nota-fiscal',
			label: 'Emissão de nota fiscal',
			desc: 'NF-e/NFS-e emitida automaticamente a cada venda.',
			monthly: 70
		},
		{
			id: 'erp',
			label: 'Integração com ERP externo',
			desc: 'Sincronização de estoque, pedidos e financeiro.',
			monthly: 120
		}
	],
	infraOptions: [
		{ id: 'aws', label: 'AWS', desc: 'Amazon Web Services, ampla disponibilidade de região.', monthly: 150 },
		{ id: 'azure', label: 'Azure', desc: 'Microsoft Azure, boa integração com Office 365.', monthly: 170 },
		{ id: 'oracle', label: 'Oracle Cloud', desc: 'Oracle Cloud Infrastructure, custo-benefício em CPU/RAM.', monthly: 140 }
	],
	orquestracaoOptions: [
		{
			id: 'compose',
			label: 'Docker Compose',
			desc: 'Um servidor, deploy simples. Ideal para a maioria dos projetos.'
		},
		{
			id: 'kubernetes',
			label: 'Kubernetes',
			desc: 'Alta disponibilidade e escala automática entre múltiplos nós.',
			monthly: 200
		}
	],
	localOptions: [
		{ id: 'brasil', label: 'Brasil (São Paulo)', desc: 'Menor latência para o público brasileiro.' },
		{ id: 'eua', label: 'Estados Unidos', desc: 'Latência maior para o Brasil, custo por vezes menor.', monthly: 40 },
		{ id: 'europa', label: 'Europa', desc: 'Ideal para operações voltadas ao público europeu.', monthly: 60 }
	],
	prazoOptions: [
		{ id: 'padrao', label: 'Padrão (6 a 8 semanas)', desc: 'Cronograma normal de desenvolvimento.' },
		{
			id: 'prioritario',
			label: 'Prioritário (3 a 4 semanas)',
			desc: 'Equipe dedicada em tempo integral ao seu projeto.',
			setup: 0.2
		},
		{
			id: 'flexivel',
			label: 'Flexível (sem urgência)',
			desc: 'Cronograma mais longo, com desconto no setup.',
			setup: -0.1
		}
	],
	dominioOptions: [
		{ id: 'proprio', label: 'Já tenho domínio', desc: 'Você aponta o DNS para a infraestrutura da Noxacloud.' },
		{
			id: 'noxacloud',
			label: 'Noxacloud registra e gerencia',
			desc: 'Cuidamos do registro, renovação e configuração de DNS.',
			monthly: 15
		}
	]
};

export const pricesMockEn: PricesContent = {
	tipoOptions: [
		{
			id: 'restaurante',
			label: 'Restaurant / Delivery',
			desc: 'Digital menu, orders, and integration with your own delivery.',
			setup: 6000,
			monthly: 350
		},
		{
			id: 'agendamento',
			label: 'Service scheduling',
			desc: 'Barbershop, salon, clinic, petshop: schedules and staff calendars.',
			setup: 5000,
			monthly: 300
		},
		{
			id: 'catalogo',
			label: 'Store / Online catalog',
			desc: 'Product showcase, inventory, and checkout for direct sales.',
			setup: 5500,
			monthly: 320
		},
		{
			id: 'b2b',
			label: 'Distributor / B2B catalog',
			desc: 'Wholesale orders, price tables, and per-client terms.',
			setup: 7000,
			monthly: 400
		},
		{
			id: 'clinica',
			label: 'Clinic / Practice',
			desc: 'Appointment schedule, simple records, and reminders.',
			setup: 5000,
			monthly: 300
		}
	],
	recursoOptions: [
		{
			id: LANDING_PAGE_ID,
			label: 'Simple landing page',
			desc: 'Single institutional page, without the resources below.',
			setup: 0
		},
		{
			id: 'pedidos',
			label: 'Online ordering system',
			desc: 'Cart, checkout, and order status tracking.',
			setup: 1500
		},
		{
			id: 'agenda',
			label: 'Calendar scheduling',
			desc: 'Staff and time-slot calendar with automatic confirmation.',
			setup: 1200
		},
		{
			id: 'catalogo-produtos',
			label: 'Product catalog',
			desc: 'Listing with categories, search, and inventory control.',
			setup: 1000
		},
		{
			id: 'login-clientes',
			label: 'Customer login',
			desc: 'Sign-up, order history, and saved details.',
			setup: 800
		},
		{
			id: 'painel-admin',
			label: 'Admin panel',
			desc: 'Manage orders, records, and internal reports.',
			setup: 1500
		}
	],
	integracaoOptions: [
		{
			id: 'whatsapp',
			label: 'WhatsApp Business API',
			desc: 'Order notifications and automated support.',
			monthly: 60
		},
		{
			id: 'pagamento',
			label: 'Payment gateway (Pix/Card)',
			desc: 'Online billing integrated into checkout.',
			monthly: 80
		},
		{
			id: 'nota-fiscal',
			label: 'Automatic invoicing',
			desc: 'Tax invoice issued automatically on every sale.',
			monthly: 70
		},
		{
			id: 'erp',
			label: 'External ERP integration',
			desc: 'Inventory, order, and financial sync.',
			monthly: 120
		}
	],
	infraOptions: [
		{ id: 'aws', label: 'AWS', desc: 'Amazon Web Services, broad region availability.', monthly: 150 },
		{ id: 'azure', label: 'Azure', desc: 'Microsoft Azure, good Office 365 integration.', monthly: 170 },
		{ id: 'oracle', label: 'Oracle Cloud', desc: 'Oracle Cloud Infrastructure, CPU/RAM value.', monthly: 140 }
	],
	orquestracaoOptions: [
		{
			id: 'compose',
			label: 'Docker Compose',
			desc: 'Single server, simple deploys. Fits most projects.'
		},
		{
			id: 'kubernetes',
			label: 'Kubernetes',
			desc: 'High availability and auto-scaling across multiple nodes.',
			monthly: 200
		}
	],
	localOptions: [
		{ id: 'brasil', label: 'Brazil (São Paulo)', desc: 'Lowest latency for a Brazilian audience.' },
		{ id: 'eua', label: 'United States', desc: 'Higher latency to Brazil, sometimes lower cost.', monthly: 40 },
		{ id: 'europa', label: 'Europe', desc: 'A good fit for a European-facing operation.', monthly: 60 }
	],
	prazoOptions: [
		{ id: 'padrao', label: 'Standard (6 to 8 weeks)', desc: 'Regular development schedule.' },
		{
			id: 'prioritario',
			label: 'Priority (3 to 4 weeks)',
			desc: 'A team dedicated full-time to your project.',
			setup: 0.2
		},
		{
			id: 'flexivel',
			label: 'Flexible (no rush)',
			desc: 'A longer timeline, with a discount on the setup fee.',
			setup: -0.1
		}
	],
	dominioOptions: [
		{ id: 'proprio', label: 'I already have a domain', desc: 'You point the DNS to Noxacloud’s infrastructure.' },
		{
			id: 'noxacloud',
			label: 'Noxacloud registers and manages it',
			desc: 'We handle registration, renewal, and DNS setup.',
			monthly: 15
		}
	]
};
