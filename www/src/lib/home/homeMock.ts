import type { HomeContent } from './homeService';

export const homeMockPtBr: HomeContent = {
	businessTypeCount: 17,
	businessTypes: [
		{ title: 'Restaurante', desc: 'Cardápio, pedidos e mesas' },
		{ title: 'Pizzaria', desc: 'Delivery e pedidos por telefone ou app' },
		{ title: 'Barbearia', desc: 'Agenda de horários e fila' },
		{ title: 'Salão de beleza', desc: 'Agendamento de serviços e profissionais' },
		{ title: 'Clínica', desc: 'Agenda de consultas e prontuário simples' },
		{ title: 'Academia', desc: 'Planos, matrícula e check-in' },
		{ title: 'Petshop', desc: 'Agendamento de banho e tosa' },
		{ title: 'Distribuidora', desc: 'Catálogo B2B e pedidos por atacado' },
		{ title: 'Loja de roupas', desc: 'Vitrine online, provas e trocas' },
		{ title: 'Farmácia', desc: 'Catálogo de produtos e entrega rápida' },
		{ title: 'Mercado ou conveniência', desc: 'Catálogo com estoque e entrega local' },
		{ title: 'Oficina mecânica', desc: 'Agendamento de serviços e orçamento' }
	],
	pillars: [
		{
			title: 'Aplicação sob medida',
			desc: 'Agendamento, delivery próprio, e-commerce, catálogo B2B, fidelidade, cupons, estoque e multiloja. Você escolhe os módulos; construímos no seu fluxo, não em cima de um template fechado.'
		},
		{
			title: 'Infraestrutura gerenciada',
			desc: 'AWS, Azure ou Oracle Cloud operados por nós: ambiente isolado, backups automáticos, monitoramento com Grafana e domínio próprio. Ou nenhuma, se você preferir hospedar por conta.'
		},
		{
			title: 'Painel do cliente',
			desc: 'Projeto, contratos, chamados e pagamentos num só lugar. Nota fiscal por competência com cada feature do mês discriminada, você vê exatamente o que pagou.'
		}
	],
	steps: [
		{
			title: 'Diagnóstico',
			desc: 'Conversamos sobre a operação, mapeamos o fluxo e definimos quais módulos fazem sentido. Sem custo e sem compromisso.'
		},
		{
			title: 'Protótipo',
			desc: 'Telas navegáveis do seu sistema antes do desenvolvimento. Você aprova o fluxo com a sua equipe, não no papel.'
		},
		{
			title: 'Desenvolvimento',
			desc: 'Entregas parciais registradas no painel, com prazo e escopo escritos em contrato.'
		},
		{
			title: 'Publicação',
			desc: 'Domínio, infraestrutura, monitoramento e treinamento da equipe. O sistema entra no ar já operando.'
		},
		{
			title: 'Manutenção',
			desc: 'Ajustes, novos módulos e suporte por chamado. Mensalidade fixa, sem taxa por atendimento.'
		}
	],
	comparisonRows: [
		{
			criterion: 'Custo por venda',
			noxacloud: 'Nenhum, mensalidade fixa',
			marketplace: 'Comissão por pedido (12% a 30%)',
			shopify: 'Plano mensal a partir de US$ 39',
			wix: 'Plano mensal a partir de R$ 60',
			wooCommerce: 'Grátis, mas hospedagem e extensões pagas à parte'
		},
		{
			criterion: 'Taxa por transação',
			noxacloud: 'Nenhuma',
			marketplace: 'Já incluída na comissão',
			shopify: '0,5% a 2% se não usar o Shopify Payments',
			wix: 'Nenhuma no gateway próprio, taxas de terceiros à parte',
			wooCommerce: 'Depende do gateway escolhido (Stripe, PagSeguro etc.)'
		},
		{
			criterion: 'Base de clientes',
			noxacloud: 'Sua, exportável',
			marketplace: 'Do marketplace',
			shopify: 'Sua, dentro da loja Shopify',
			wix: 'Sua, dentro da conta Wix',
			wooCommerce: 'Sua, no seu banco de dados WordPress'
		},
		{
			criterion: 'Fluxo do seu negócio',
			noxacloud: 'Construído sob medida',
			marketplace: 'Padrão da plataforma',
			shopify: 'O que o tema e os apps permitem',
			wix: 'O que o editor visual permite',
			wooCommerce: 'Customizável via código, exige desenvolvedor'
		},
		{
			criterion: 'Domínio próprio',
			noxacloud: 'Sim',
			marketplace: 'Não',
			shopify: 'Sim',
			wix: 'Sim',
			wooCommerce: 'Sim'
		},
		{
			criterion: 'Integração com ERP / PDV',
			noxacloud: 'API REST documentada e webhooks',
			marketplace: 'Limitada ou inexistente',
			shopify: 'Via app pago na Shopify App Store',
			wix: 'Poucas opções, mercado de apps limitado',
			wooCommerce: 'Via plugin, gratuito ou pago'
		},
		{
			criterion: 'Integração com CRM',
			noxacloud: 'Via API e webhooks, com qualquer CRM',
			marketplace: 'Não disponível',
			shopify: 'Apps pagos (HubSpot, Klaviyo)',
			wix: 'Apps limitados na Wix App Market',
			wooCommerce: 'Plugins gratuitos e pagos (HubSpot, WP Fusion)'
		},
		{
			criterion: 'Envio de e-mails',
			noxacloud: 'Incluso, transacional e marketing',
			marketplace: 'Não disponível',
			shopify: 'Shopify Email incluso, recursos avançados pagos',
			wix: 'Wix Automations, limitado no plano grátis',
			wooCommerce: 'Requer plugin (Mailchimp, WP Mail SMTP)'
		},
		{
			criterion: 'Infraestrutura',
			noxacloud: 'Gerenciada por nós, AWS, Azure ou Oracle Cloud',
			marketplace: 'Da plataforma',
			shopify: 'Da Shopify, sem acesso ao servidor',
			wix: 'Da Wix, sem acesso ao servidor',
			wooCommerce: 'Sua, em hospedagem WordPress separada'
		},
		{
			criterion: 'Quem ajusta quando muda',
			noxacloud: 'Nosso time, por chamado, incluso na mensalidade',
			marketplace: 'Ninguém',
			shopify: 'Você, ou contrata um parceiro Shopify',
			wix: 'Você mesmo, no editor',
			wooCommerce: 'Você, ou contrata um desenvolvedor WordPress'
		}
	],
	guarantees: [
		{
			title: 'Prazo com consequência',
			desc: 'Atraso na entrega gera desconto previsto em contrato. Prazo é obrigação nossa, não expectativa sua.'
		},
		{
			title: 'Os dados são seus',
			desc: 'Base de clientes, pedidos e conteúdo pertencem ao seu negócio, do primeiro ao último dia.'
		},
		{
			title: 'Saída sem sequestro',
			desc: 'Encerrando o contrato, você recebe a exportação completa dos dados e o histórico do projeto.'
		},
		{
			title: 'Segurança e backup',
			desc: 'Acesso controlado por perfil, backup automático do banco e registro de alterações no painel.'
		}
	],
	faq: [
		{
			q: 'Preciso de equipe técnica para usar?',
			a: 'Não. Nós cuidamos de servidor, domínio, backup e atualizações. Sua equipe usa o sistema e, quando precisa de ajuste, abre um chamado no painel.'
		},
		{
			q: 'Posso usar meu próprio domínio?',
			a: 'Sim. O sistema roda no domínio que você escolher, com certificado configurado por nós. Se ainda não tem domínio, registramos junto no projeto.'
		},
		{
			q: 'Já uso ERP e PDV. Vou ter que trocar?',
			a: 'Não. Integramos por API REST documentada e webhooks para pedidos, estoque e pagamentos. O que já funciona na sua operação continua funcionando.'
		},
		{
			q: 'Quanto tempo leva para entrar no ar?',
			a: 'Depende dos módulos escolhidos. O prazo é definido depois do diagnóstico e escrito em contrato, com entregas parciais visíveis no painel ao longo do caminho.'
		},
		{
			q: 'Vocês cobram comissão por venda?',
			a: 'Não. O modelo é implantação mais mensalidade fixa. Vender mais no seu canal não aumenta o que você paga para a Noxacloud.'
		},
		{
			q: 'Se eu quiser encerrar, o que acontece?',
			a: 'Você comunica com a antecedência prevista nos Termos e recebe a exportação completa dos dados, além do histórico do projeto. Nada fica retido.'
		}
	]
};

export const homeMockEn: HomeContent = {
	businessTypeCount: 17,
	businessTypes: [
		{ title: 'Restaurant', desc: 'Menu, orders, and tables' },
		{ title: 'Pizzeria', desc: 'Delivery and phone or app orders' },
		{ title: 'Barbershop', desc: 'Appointment schedule and queue' },
		{ title: 'Beauty salon', desc: 'Service and professional scheduling' },
		{ title: 'Clinic', desc: 'Appointment schedule and simple patient records' },
		{ title: 'Gym', desc: 'Plans, enrollment, and check-in' },
		{ title: 'Pet shop', desc: 'Bath and grooming scheduling' },
		{ title: 'Distributor', desc: 'B2B catalog and wholesale orders' },
		{ title: 'Clothing store', desc: 'Online storefront, fittings, and returns' },
		{ title: 'Pharmacy', desc: 'Product catalog and fast delivery' },
		{ title: 'Market or convenience store', desc: 'Catalog with inventory and local delivery' },
		{ title: 'Auto repair shop', desc: 'Service scheduling and quotes' }
	],
	pillars: [
		{
			title: 'Custom-built application',
			desc: "Scheduling, your own delivery, e-commerce, B2B catalog, loyalty, coupons, inventory, and multi-store. You choose the modules; we build around your workflow, not on top of a closed template."
		},
		{
			title: 'Managed infrastructure',
			desc: 'AWS, Azure, or Oracle Cloud operated by us: isolated environment, automatic backups, Grafana monitoring, and your own domain. Or none of that, if you prefer to host it yourself.'
		},
		{
			title: 'Client panel',
			desc: 'Project, contracts, tickets, and payments in one place. A monthly invoice itemizing every feature, so you see exactly what you paid for.'
		}
	],
	steps: [
		{
			title: 'Diagnosis',
			desc: 'We talk through your operation, map the workflow, and decide which modules make sense. No cost, no commitment.'
		},
		{
			title: 'Prototype',
			desc: "Clickable screens of your system before development starts. You approve the flow with your team, not on paper."
		},
		{
			title: 'Development',
			desc: 'Partial deliveries tracked in the panel, with the timeline and scope written into the contract.'
		},
		{
			title: 'Launch',
			desc: "Domain, infrastructure, monitoring, and team training. The system goes live already operating."
		},
		{
			title: 'Maintenance',
			desc: 'Adjustments, new modules, and ticket-based support. A fixed monthly fee, no per-request charge.'
		}
	],
	comparisonRows: [
		{
			criterion: 'Cost per sale',
			noxacloud: 'None, fixed monthly fee',
			marketplace: 'Commission per order (12% to 30%)',
			shopify: 'Monthly plan starting at US$39',
			wix: 'Monthly plan starting at ~US$16',
			wooCommerce: 'Free, but hosting and paid extensions are extra'
		},
		{
			criterion: 'Transaction fee',
			noxacloud: 'None',
			marketplace: 'Already folded into the commission',
			shopify: '0.5% to 2% unless you use Shopify Payments',
			wix: "None on the platform's own gateway, third-party fees are extra",
			wooCommerce: 'Depends on the gateway you choose (Stripe, PayPal, etc.)'
		},
		{
			criterion: 'Customer base',
			noxacloud: 'Yours, exportable',
			marketplace: "The marketplace's",
			shopify: 'Yours, inside the Shopify store',
			wix: 'Yours, inside the Wix account',
			wooCommerce: 'Yours, in your own WordPress database'
		},
		{
			criterion: 'Your business workflow',
			noxacloud: 'Built to your spec',
			marketplace: 'The platform standard',
			shopify: 'Whatever the theme and apps allow',
			wix: 'Whatever the visual editor allows',
			wooCommerce: 'Customizable via code, requires a developer'
		},
		{
			criterion: 'Your own domain',
			noxacloud: 'Yes',
			marketplace: 'No',
			shopify: 'Yes',
			wix: 'Yes',
			wooCommerce: 'Yes'
		},
		{
			criterion: 'ERP / POS integration',
			noxacloud: 'Documented REST API and webhooks',
			marketplace: 'Limited or nonexistent',
			shopify: 'Via a paid app on the Shopify App Store',
			wix: 'Few options, limited app marketplace',
			wooCommerce: 'Via plugin, free or paid'
		},
		{
			criterion: 'CRM integration',
			noxacloud: 'Via API and webhooks, with any CRM',
			marketplace: 'Not available',
			shopify: 'Paid apps (HubSpot, Klaviyo)',
			wix: 'Limited apps on the Wix App Market',
			wooCommerce: 'Free and paid plugins (HubSpot, WP Fusion)'
		},
		{
			criterion: 'Sending emails',
			noxacloud: 'Included, transactional and marketing',
			marketplace: 'Not available',
			shopify: 'Shopify Email included, advanced features are paid',
			wix: 'Wix Automations, limited on the free plan',
			wooCommerce: 'Requires a plugin (Mailchimp, WP Mail SMTP)'
		},
		{
			criterion: 'Infrastructure',
			noxacloud: 'Managed by us, AWS, Azure, or Oracle Cloud',
			marketplace: "The platform's",
			shopify: "Shopify's, no server access",
			wix: "Wix's, no server access",
			wooCommerce: 'Yours, on separate WordPress hosting'
		},
		{
			criterion: 'Who makes changes when things change',
			noxacloud: 'Our team, via ticket, included in the monthly fee',
			marketplace: 'No one',
			shopify: 'You, or you hire a Shopify partner',
			wix: 'You, in the editor',
			wooCommerce: 'You, or you hire a WordPress developer'
		}
	],
	guarantees: [
		{
			title: 'Deadlines with consequences',
			desc: "A late delivery triggers a discount defined in the contract. The deadline is our obligation, not your hope."
		},
		{
			title: 'Your data is yours',
			desc: 'Your customer base, orders, and content belong to your business, from day one to the last.'
		},
		{
			title: 'Exit without lock-in',
			desc: 'When the contract ends, you receive a full export of your data and the project history.'
		},
		{
			title: 'Security and backups',
			desc: 'Role-based access control, automatic database backups, and a log of changes in the panel.'
		}
	],
	faq: [
		{
			q: 'Do I need a technical team to use it?',
			a: "No. We take care of the server, domain, backups, and updates. Your team uses the system and opens a ticket in the panel whenever it needs an adjustment."
		},
		{
			q: 'Can I use my own domain?',
			a: 'Yes. The system runs on the domain of your choice, with a certificate we configure. If you don\'t have a domain yet, we register it as part of the project.'
		},
		{
			q: "I already use an ERP and POS. Will I have to switch?",
			a: "No. We integrate via a documented REST API and webhooks for orders, inventory, and payments. Whatever already works in your operation keeps working."
		},
		{
			q: 'How long until it goes live?',
			a: 'It depends on the modules chosen. The timeline is set after the diagnosis and written into the contract, with partial deliveries visible in the panel along the way.'
		},
		{
			q: 'Do you charge a commission per sale?',
			a: "No. The model is a build fee plus a fixed monthly fee. Selling more through your channel doesn't increase what you pay Noxacloud."
		},
		{
			q: 'What happens if I want to cancel?',
			a: 'You give the notice period set out in the Terms and receive a full export of your data, plus the project history. Nothing is withheld.'
		}
	]
};
