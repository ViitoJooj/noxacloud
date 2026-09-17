import type { InfraContent } from './infrastructureService';

export const infrastructureMockPtBr: InfraContent = {
	flowSteps: [
		'URL',
		'Roteamento',
		'AWS / Azure / Oracle',
		'Frontend (site)',
		'Backend (core)',
		'Validação',
		'Banco de dados'
	],
	managedItems: [
		{
			title: 'Ambientes isolados',
			desc: 'Cada cliente roda em instância própria, com painel de controle dedicado sob seu comando.'
		},
		{
			title: 'Monitoramento',
			desc: 'Logs e uptime das aplicações acompanhados em tempo real, sem depender de terceiros.'
		},
		{
			title: 'Autenticação',
			desc: 'Melhores métodos de login e proteção de acesso disponíveis, atualizados continuamente.'
		},
		{
			title: 'URL própria',
			desc: 'Use o domínio da sua escolha na hospedagem, sem depender de um subdomínio padrão.'
		},
		{
			title: 'Visualização em Grafana',
			desc: 'Dashboards de métricas e desempenho da sua infraestrutura, acessíveis pelo painel.'
		},
		{
			title: 'Backups automáticos',
			desc: 'Rotina de backup do banco de dados sem intervenção manual, com histórico no painel.'
		}
	],
	notificationItems: [
		{
			title: 'Backups',
			desc: 'Aviso quando um backup automático é concluído, e quando um backup antigo é apagado.'
		},
		{
			title: 'Métricas de requisições',
			desc: 'Volume e padrão de chamadas à sua aplicação, para acompanhar picos de uso.'
		},
		{
			title: 'Tentativas de invasão',
			desc: 'Alertas de tentativas de acesso indevido e outros eventos de segurança.'
		}
	],
	stackRows: [
		{
			layer: 'Frontend',
			technology: 'SvelteKit',
			role: 'Interface do seu site ou sistema para os clientes finais e para a sua administração'
		},
		{
			layer: 'Backend / Core',
			technology: 'Golang',
			role: 'Regras de negócio da sua aplicação: agendamento, pedidos e pagamentos'
		},
		{
			layer: 'Banco de dados',
			technology: 'PostgreSQL',
			role: 'Instância dedicada ao seu negócio, isolada de outros clientes'
		},
		{
			layer: 'Cache',
			technology: 'Redis',
			role: 'Respostas rápidas para dados de acesso frequente da sua aplicação'
		},
		{
			layer: 'Mensageria',
			technology: 'RabbitMQ',
			role: 'Processamento assíncrono de tarefas como notificações e webhooks'
		},
		{
			layer: 'Roteamento e domínio',
			technology: 'Cloudflare',
			role: 'DNS, roteamento e gerenciamento do domínio da sua aplicação'
		},
		{
			layer: 'Proxy',
			technology: 'Caddy',
			role: 'Encaminhamento de tráfego e certificados SSL da sua aplicação'
		},
		{
			layer: 'Encapsulamento',
			technology: 'Docker ou Kubernetes',
			role: 'Isolamento de ambiente e manutenção de uptime da sua aplicação'
		},
		{
			layer: 'Infraestrutura',
			technology: 'AWS, Azure ou Oracle',
			role: 'Hospedagem, escalabilidade e redundância da sua aplicação'
		}
	]
};

export const infrastructureMockEn: InfraContent = {
	flowSteps: [
		'URL',
		'Routing',
		'AWS / Azure / Oracle',
		'Frontend (site)',
		'Backend (core)',
		'Validation',
		'Database'
	],
	managedItems: [
		{
			title: 'Isolated environments',
			desc: 'Each client runs in its own instance, with a dedicated control panel under your command.'
		},
		{
			title: 'Monitoring',
			desc: 'Application logs and uptime tracked in real time, without relying on third parties.'
		},
		{
			title: 'Authentication',
			desc: 'The best login methods and access protection available, continuously updated.'
		},
		{
			title: 'Your own domain',
			desc: 'Use the domain of your choice for hosting, with no dependency on a default subdomain.'
		},
		{
			title: 'Grafana dashboards',
			desc: "Metrics and performance dashboards for your infrastructure, accessible from the panel."
		},
		{
			title: 'Automatic backups',
			desc: 'A database backup routine with no manual intervention, with full history in the panel.'
		}
	],
	notificationItems: [
		{
			title: 'Backups',
			desc: 'Notified when an automatic backup completes, and when an old backup is deleted.'
		},
		{
			title: 'Request metrics',
			desc: "Volume and pattern of calls to your application, to track usage spikes."
		},
		{
			title: 'Intrusion attempts',
			desc: 'Alerts for unauthorized access attempts and other security events.'
		}
	],
	stackRows: [
		{
			layer: 'Frontend',
			technology: 'SvelteKit',
			role: "The interface of your site or system for end customers and for your own administration"
		},
		{
			layer: 'Backend / Core',
			technology: 'Golang',
			role: "Your application's business rules: scheduling, orders, and payments"
		},
		{
			layer: 'Database',
			technology: 'PostgreSQL',
			role: 'A dedicated instance for your business, isolated from other clients'
		},
		{
			layer: 'Cache',
			technology: 'Redis',
			role: "Fast responses for your application's frequently accessed data"
		},
		{
			layer: 'Messaging',
			technology: 'RabbitMQ',
			role: 'Asynchronous processing of tasks such as notifications and webhooks'
		},
		{
			layer: 'Routing and domain',
			technology: 'Cloudflare',
			role: "DNS, routing, and management of your application's domain"
		},
		{
			layer: 'Proxy',
			technology: 'Caddy',
			role: "Traffic forwarding and SSL certificates for your application"
		},
		{
			layer: 'Containerization',
			technology: 'Docker or Kubernetes',
			role: "Environment isolation and uptime maintenance for your application"
		},
		{
			layer: 'Infrastructure',
			technology: 'AWS, Azure, or Oracle',
			role: "Hosting, scalability, and redundancy for your application"
		}
	]
};
