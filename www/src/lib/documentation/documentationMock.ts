import type { DocumentationContent } from './documentationService';

export const documentationMockPtBr: DocumentationContent = {
	groupOrder: ['Estabelecimento', 'Pedidos', 'Agendamentos', 'Pagamentos', 'Webhooks'],
	endpoints: [
		{
			key: 'get-estabelecimento',
			group: 'Estabelecimento',
			tier: 'publica',
			method: 'GET',
			path: '/v1/estabelecimento',
			desc: 'Dados públicos do estabelecimento',
			longDesc:
				'Retorna informações públicas do estabelecimento: nome, endereço, horário de funcionamento e serviços oferecidos.',
			params: [],
			requestRaw: '',
			responses: [
				{
					code: '200',
					desc: 'Dados do estabelecimento retornados',
					example:
						'{\n  "nome": "Barbearia Nova Era",\n  "endereco": "Rua das Flores, 120",\n  "horario": "09:00 - 19:00",\n  "servicos": ["Corte masculino", "Barba"]\n}'
				}
			]
		},
		{
			key: 'get-pedidos',
			group: 'Pedidos',
			tier: 'cliente',
			method: 'GET',
			path: '/v1/pedidos',
			desc: 'Lista pedidos do estabelecimento, com filtro por status e data',
			longDesc:
				'Retorna os pedidos registrados no estabelecimento autenticado, em ordem cronológica decrescente.',
			params: [
				{
					name: 'status',
					location: 'query',
					type: 'string',
					required: 'Não',
					desc: 'Filtra por aberto, pago ou cancelado'
				},
				{
					name: 'data',
					location: 'query',
					type: 'string (ISO 8601)',
					required: 'Não',
					desc: 'Filtra pedidos de uma data específica'
				}
			],
			requestRaw: 'GET /v1/pedidos?status=aberto&data=2026-09-11',
			responses: [
				{
					code: '200',
					desc: 'Lista de pedidos retornada',
					example:
						'[\n  {\n    "id": "ped_8f2a",\n    "status": "aberto",\n    "total": 8750,\n    "criado_em": "2026-09-11T12:03:00Z"\n  }\n]'
				},
				{
					code: '401',
					desc: 'Sessão inválida ou expirada',
					example: '{\n  "erro": "unauthorized",\n  "mensagem": "Token de acesso ausente ou expirado"\n}'
				}
			]
		},
		{
			key: 'get-agendamentos',
			group: 'Agendamentos',
			tier: 'publica',
			method: 'GET',
			path: '/v1/agendamentos/disponibilidade',
			desc: 'Consulta horários disponíveis para agendamento',
			longDesc:
				'Retorna os horários livres para a data informada, usado em widgets públicos de agendamento no site do estabelecimento.',
			params: [
				{
					name: 'data',
					location: 'query',
					type: 'string (ISO 8601)',
					required: 'Não',
					desc: 'Restringe a uma data específica'
				}
			],
			requestRaw: 'GET /v1/agendamentos/disponibilidade?data=2026-09-12',
			responses: [
				{
					code: '200',
					desc: 'Lista de horários disponíveis',
					example:
						'[\n  { "horario": "2026-09-12T10:00:00Z" },\n  { "horario": "2026-09-12T14:00:00Z" }\n]'
				}
			]
		},
		{
			key: 'post-pedidos',
			group: 'Pedidos',
			tier: 'cliente',
			method: 'POST',
			path: '/v1/pedidos',
			desc: 'Cria um novo pedido a partir do catálogo',
			longDesc:
				'Cria um pedido vinculado ao estabelecimento autenticado, a partir de uma lista de itens do catálogo.',
			params: [],
			requestRaw:
				'{\n  "cliente": "Maria Souza",\n  "itens": [\n    { "produto_id": "prod_02", "quantidade": 2 }\n  ]\n}',
			responses: [
				{
					code: '201',
					desc: 'Pedido criado com sucesso',
					example: '{\n  "id": "ped_9d31",\n  "status": "aberto",\n  "total": 4200\n}'
				},
				{
					code: '422',
					desc: 'Itens inválidos ou catálogo incompleto',
					example:
						'{\n  "erro": "unprocessable_entity",\n  "mensagem": "produto_id \'prod_99\' não existe no catálogo",\n  "campo": "itens[0].produto_id"\n}'
				}
			]
		},
		{
			key: 'post-webhooks',
			group: 'Webhooks',
			tier: 'cliente',
			method: 'POST',
			path: '/v1/webhooks',
			desc: 'Registra uma URL para receber eventos em tempo real',
			longDesc: 'Cadastra um endpoint HTTP que passará a receber os eventos selecionados assim que ocorrerem.',
			params: [],
			requestRaw:
				'{\n  "url": "https://seusite.com.br/webhooks/noxacloud",\n  "eventos": ["pedido.criado", "pagamento.confirmado"]\n}',
			responses: [
				{
					code: '201',
					desc: 'Webhook registrado e ativo',
					example:
						'{\n  "id": "wh_44a1",\n  "url": "https://seusite.com.br/webhooks/noxacloud",\n  "ativo": true\n}'
				},
				{
					code: '400',
					desc: 'URL ou lista de eventos inválida',
					example: '{\n  "erro": "bad_request",\n  "mensagem": "url deve usar https e eventos não pode ser vazio"\n}'
				}
			]
		},
		{
			key: 'get-faturas',
			group: 'Pagamentos',
			tier: 'cliente',
			method: 'GET',
			path: '/v1/faturas',
			desc: 'Histórico de faturas e status de pagamento',
			longDesc: 'Retorna o histórico de faturas mensais do estabelecimento, com o status de pagamento de cada uma.',
			params: [
				{
					name: 'limite',
					location: 'query',
					type: 'integer',
					required: 'Não',
					desc: 'Número máximo de faturas retornadas'
				}
			],
			requestRaw: 'GET /v1/faturas?limite=3',
			responses: [
				{
					code: '200',
					desc: 'Lista de faturas retornada',
					example: '[\n  { "referencia": "2026-09", "valor": 100000, "status": "pago" }\n]'
				},
				{
					code: '401',
					desc: 'Sessão inválida ou expirada',
					example: '{\n  "erro": "unauthorized",\n  "mensagem": "Token de acesso ausente ou expirado"\n}'
				}
			]
		},
		{
			key: 'query-pedidos',
			group: 'Pedidos',
			tier: 'cliente',
			method: 'QUERY',
			path: '/v1/pedidos/query',
			desc: 'Busca avançada de pedidos com múltiplos filtros',
			longDesc:
				'Permite combinar vários critérios de busca no corpo da requisição, além dos filtros simples disponíveis via query string.',
			params: [],
			requestRaw:
				'{\n  "filtros": {\n    "status": ["aberto", "pago"],\n    "valor_min": 1000,\n    "cliente_contem": "Silva"\n  },\n  "ordenar_por": "criado_em"\n}',
			responses: [
				{
					code: '200',
					desc: 'Resultado da busca retornado',
					example: '[\n  {\n    "id": "ped_8f2a",\n    "status": "aberto",\n    "total": 8750\n  }\n]'
				},
				{
					code: '400',
					desc: 'Filtros inválidos',
					example: '{\n  "erro": "bad_request",\n  "mensagem": "valor_min deve ser um número positivo"\n}'
				}
			]
		},
		{
			key: 'put-pedidos',
			group: 'Pedidos',
			tier: 'cliente',
			method: 'PUT',
			path: '/v1/pedidos/{id}',
			desc: 'Substitui um pedido existente por completo',
			longDesc:
				'Sobrescreve todos os campos do pedido informado, envie o objeto completo, não apenas os campos alterados.',
			params: [],
			requestRaw:
				'{\n  "cliente": "Maria Souza",\n  "itens": [\n    { "produto_id": "prod_02", "quantidade": 3 }\n  ],\n  "status": "aberto"\n}',
			responses: [
				{
					code: '200',
					desc: 'Pedido substituído com sucesso',
					example: '{\n  "id": "ped_9d31",\n  "status": "aberto",\n  "total": 6300\n}'
				},
				{
					code: '404',
					desc: 'Pedido não encontrado',
					example: '{\n  "erro": "not_found",\n  "mensagem": "Nenhum pedido com id \'ped_9d31\'"\n}'
				}
			]
		},
		{
			key: 'patch-agendamentos',
			group: 'Agendamentos',
			tier: 'cliente',
			method: 'PATCH',
			path: '/v1/agendamentos/{id}',
			desc: 'Atualiza parcialmente um agendamento',
			longDesc:
				'Atualiza apenas os campos enviados, útil para reagendar horário ou trocar o serviço sem reenviar o objeto inteiro.',
			params: [],
			requestRaw: '{\n  "horario": "2026-09-13T10:00:00Z"\n}',
			responses: [
				{
					code: '200',
					desc: 'Agendamento atualizado',
					example:
						'{\n  "id": "agd_1c90",\n  "horario": "2026-09-13T10:00:00Z",\n  "servico": "Corte masculino"\n}'
				},
				{
					code: '409',
					desc: 'Conflito com outro horário já agendado',
					example: '{\n  "erro": "conflict",\n  "mensagem": "Horário já ocupado para este profissional"\n}'
				}
			]
		},
		{
			key: 'delete-webhooks',
			group: 'Webhooks',
			tier: 'cliente',
			method: 'DELETE',
			path: '/v1/webhooks/{id}',
			desc: 'Remove um webhook cadastrado',
			longDesc: 'Cancela o envio de eventos para a URL cadastrada e remove o registro permanentemente.',
			params: [],
			requestRaw: '',
			responses: [
				{ code: '204', desc: 'Webhook removido, sem conteúdo de retorno', example: '' },
				{
					code: '404',
					desc: 'Webhook não encontrado',
					example: '{\n  "erro": "not_found",\n  "mensagem": "Nenhum webhook com id \'wh_44a1\'"\n}'
				}
			]
		}
	]
};

export const documentationMockEn: DocumentationContent = {
	groupOrder: ['Establishment', 'Orders', 'Scheduling', 'Payments', 'Webhooks'],
	endpoints: [
		{
			key: 'get-estabelecimento',
			group: 'Establishment',
			tier: 'publica',
			method: 'GET',
			path: '/v1/estabelecimento',
			desc: 'Public establishment data',
			longDesc: 'Returns public information about the establishment: name, address, opening hours, and services offered.',
			params: [],
			requestRaw: '',
			responses: [
				{
					code: '200',
					desc: 'Establishment data returned',
					example:
						'{\n  "nome": "Barbearia Nova Era",\n  "endereco": "Rua das Flores, 120",\n  "horario": "09:00 - 19:00",\n  "servicos": ["Corte masculino", "Barba"]\n}'
				}
			]
		},
		{
			key: 'get-pedidos',
			group: 'Orders',
			tier: 'cliente',
			method: 'GET',
			path: '/v1/pedidos',
			desc: "Lists the establishment's orders, with filters by status and date",
			longDesc: 'Returns the orders registered for the authenticated establishment, in descending chronological order.',
			params: [
				{
					name: 'status',
					location: 'query',
					type: 'string',
					required: 'No',
					desc: 'Filters by status: aberto (open), pago (paid), or cancelado (cancelled)'
				},
				{
					name: 'data',
					location: 'query',
					type: 'string (ISO 8601)',
					required: 'No',
					desc: 'Filters orders for a specific date'
				}
			],
			requestRaw: 'GET /v1/pedidos?status=aberto&data=2026-09-11',
			responses: [
				{
					code: '200',
					desc: 'List of orders returned',
					example:
						'[\n  {\n    "id": "ped_8f2a",\n    "status": "aberto",\n    "total": 8750,\n    "criado_em": "2026-09-11T12:03:00Z"\n  }\n]'
				},
				{
					code: '401',
					desc: 'Invalid or expired session',
					example: '{\n  "erro": "unauthorized",\n  "mensagem": "Token de acesso ausente ou expirado"\n}'
				}
			]
		},
		{
			key: 'get-agendamentos',
			group: 'Scheduling',
			tier: 'publica',
			method: 'GET',
			path: '/v1/agendamentos/disponibilidade',
			desc: 'Looks up available appointment slots',
			longDesc:
				"Returns the open time slots for the given date, used in the establishment's public scheduling widgets.",
			params: [
				{
					name: 'data',
					location: 'query',
					type: 'string (ISO 8601)',
					required: 'No',
					desc: 'Restricts results to a specific date'
				}
			],
			requestRaw: 'GET /v1/agendamentos/disponibilidade?data=2026-09-12',
			responses: [
				{
					code: '200',
					desc: 'List of available time slots',
					example:
						'[\n  { "horario": "2026-09-12T10:00:00Z" },\n  { "horario": "2026-09-12T14:00:00Z" }\n]'
				}
			]
		},
		{
			key: 'post-pedidos',
			group: 'Orders',
			tier: 'cliente',
			method: 'POST',
			path: '/v1/pedidos',
			desc: 'Creates a new order from the catalog',
			longDesc: "Creates an order tied to the authenticated establishment, from a list of catalog items.",
			params: [],
			requestRaw:
				'{\n  "cliente": "Maria Souza",\n  "itens": [\n    { "produto_id": "prod_02", "quantidade": 2 }\n  ]\n}',
			responses: [
				{
					code: '201',
					desc: 'Order created successfully',
					example: '{\n  "id": "ped_9d31",\n  "status": "aberto",\n  "total": 4200\n}'
				},
				{
					code: '422',
					desc: 'Invalid items or incomplete catalog',
					example:
						'{\n  "erro": "unprocessable_entity",\n  "mensagem": "produto_id \'prod_99\' não existe no catálogo",\n  "campo": "itens[0].produto_id"\n}'
				}
			]
		},
		{
			key: 'post-webhooks',
			group: 'Webhooks',
			tier: 'cliente',
			method: 'POST',
			path: '/v1/webhooks',
			desc: 'Registers a URL to receive real-time events',
			longDesc: 'Registers an HTTP endpoint that will start receiving the selected events as soon as they occur.',
			params: [],
			requestRaw:
				'{\n  "url": "https://seusite.com.br/webhooks/noxacloud",\n  "eventos": ["pedido.criado", "pagamento.confirmado"]\n}',
			responses: [
				{
					code: '201',
					desc: 'Webhook registered and active',
					example:
						'{\n  "id": "wh_44a1",\n  "url": "https://seusite.com.br/webhooks/noxacloud",\n  "ativo": true\n}'
				},
				{
					code: '400',
					desc: 'Invalid URL or event list',
					example: '{\n  "erro": "bad_request",\n  "mensagem": "url deve usar https e eventos não pode ser vazio"\n}'
				}
			]
		},
		{
			key: 'get-faturas',
			group: 'Payments',
			tier: 'cliente',
			method: 'GET',
			path: '/v1/faturas',
			desc: 'Invoice history and payment status',
			longDesc: "Returns the establishment's monthly invoice history, with each invoice's payment status.",
			params: [
				{
					name: 'limite',
					location: 'query',
					type: 'integer',
					required: 'No',
					desc: 'Maximum number of invoices returned'
				}
			],
			requestRaw: 'GET /v1/faturas?limite=3',
			responses: [
				{
					code: '200',
					desc: 'List of invoices returned',
					example: '[\n  { "referencia": "2026-09", "valor": 100000, "status": "pago" }\n]'
				},
				{
					code: '401',
					desc: 'Invalid or expired session',
					example: '{\n  "erro": "unauthorized",\n  "mensagem": "Token de acesso ausente ou expirado"\n}'
				}
			]
		},
		{
			key: 'query-pedidos',
			group: 'Orders',
			tier: 'cliente',
			method: 'QUERY',
			path: '/v1/pedidos/query',
			desc: 'Advanced order search with multiple filters',
			longDesc:
				'Lets you combine several search criteria in the request body, beyond the simple filters available via query string.',
			params: [],
			requestRaw:
				'{\n  "filtros": {\n    "status": ["aberto", "pago"],\n    "valor_min": 1000,\n    "cliente_contem": "Silva"\n  },\n  "ordenar_por": "criado_em"\n}',
			responses: [
				{
					code: '200',
					desc: 'Search result returned',
					example: '[\n  {\n    "id": "ped_8f2a",\n    "status": "aberto",\n    "total": 8750\n  }\n]'
				},
				{
					code: '400',
					desc: 'Invalid filters',
					example: '{\n  "erro": "bad_request",\n  "mensagem": "valor_min deve ser um número positivo"\n}'
				}
			]
		},
		{
			key: 'put-pedidos',
			group: 'Orders',
			tier: 'cliente',
			method: 'PUT',
			path: '/v1/pedidos/{id}',
			desc: 'Fully replaces an existing order',
			longDesc: 'Overwrites every field of the given order — send the complete object, not just the changed fields.',
			params: [],
			requestRaw:
				'{\n  "cliente": "Maria Souza",\n  "itens": [\n    { "produto_id": "prod_02", "quantidade": 3 }\n  ],\n  "status": "aberto"\n}',
			responses: [
				{
					code: '200',
					desc: 'Order replaced successfully',
					example: '{\n  "id": "ped_9d31",\n  "status": "aberto",\n  "total": 6300\n}'
				},
				{
					code: '404',
					desc: 'Order not found',
					example: '{\n  "erro": "not_found",\n  "mensagem": "Nenhum pedido com id \'ped_9d31\'"\n}'
				}
			]
		},
		{
			key: 'patch-agendamentos',
			group: 'Scheduling',
			tier: 'cliente',
			method: 'PATCH',
			path: '/v1/agendamentos/{id}',
			desc: 'Partially updates an appointment',
			longDesc:
				'Updates only the fields sent — useful for rescheduling a time slot or changing the service without resending the whole object.',
			params: [],
			requestRaw: '{\n  "horario": "2026-09-13T10:00:00Z"\n}',
			responses: [
				{
					code: '200',
					desc: 'Appointment updated',
					example:
						'{\n  "id": "agd_1c90",\n  "horario": "2026-09-13T10:00:00Z",\n  "servico": "Corte masculino"\n}'
				},
				{
					code: '409',
					desc: 'Conflict with another already-scheduled time slot',
					example: '{\n  "erro": "conflict",\n  "mensagem": "Horário já ocupado para este profissional"\n}'
				}
			]
		},
		{
			key: 'delete-webhooks',
			group: 'Webhooks',
			tier: 'cliente',
			method: 'DELETE',
			path: '/v1/webhooks/{id}',
			desc: 'Removes a registered webhook',
			longDesc: 'Stops event delivery to the registered URL and permanently removes the record.',
			params: [],
			requestRaw: '',
			responses: [
				{ code: '204', desc: 'Webhook removed, no response content', example: '' },
				{
					code: '404',
					desc: 'Webhook not found',
					example: '{\n  "erro": "not_found",\n  "mensagem": "Nenhum webhook com id \'wh_44a1\'"\n}'
				}
			]
		}
	]
};
