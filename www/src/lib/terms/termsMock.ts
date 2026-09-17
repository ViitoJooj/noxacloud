import type { TermsSection } from './termsService';

export const termsMockPtBr: TermsSection[] = [
	{
		title: 'Atraso de Pagamento',
		subsections: [
			{
				heading: '1. Limitações Administrativas e de Suporte (D1 ao D3 de atraso)',
				blocks: [
					{
						p: 'Nesta primeira fase, o site/app continua funcionando para o cliente final dele, mas as regalias do portal da Noxacloud são cortadas:'
					},
					{
						list: [
							'Suporte Técnico e SLA: suspensão imediata de atendimentos, chamados ou solicitações de dúvidas;',
							'Novas Modificações ou Features: bloqueio de qualquer alteração de código, ajuste de layout ou deploy pendente;',
							'Solicitações de Edição de Contrato: impedimento de registrar novos aditivos ou mudanças no portal;',
							'Envio do Kit Físico (se novo cliente): retenção do envio postal das vias do contrato até a compensação do sinal/fatura.'
						]
					}
				]
			},
			{
				heading: '2. Limitações de Acesso ao Portal e Operação (D5 ao D7 de atraso)',
				blocks: [
					{ p: 'O atraso já começa a impactar o uso diário da plataforma:' },
					{
						list: [
							'Exportação de Backups e Código: bloqueio das funcionalidades de download do dump do PostgreSQL, do código-fonte e dos arquivos do Docker, já que a exportação exige conta regular e adimplente;',
							'Painel Administrativo do Cliente: impedimento de acesso às métricas, relatórios internos ou gerenciamento de cadastros dentro do portal do cliente;',
							'Acesso às Chaves de API Públicas: desativação temporária do painel de geração/consulta de API Keys.'
						]
					}
				]
			},
			{
				heading: '3. Limitações de Infraestrutura e Apagão do Serviço (D8 ao D15 de atraso)',
				blocks: [
					{
						p: 'Se a fatura de infraestrutura e serviço não for paga após a régua de cobrança e avisos formais, o recurso computacional é cortado para estancar os custos da NOXACLOUD:'
					},
					{
						list: [
							'Página de Suspensão / Bloqueio no Frontend: substituição do site/plataforma do cliente por uma tela genérica (ex: "Serviço temporariamente indisponível, entre em contato com o suporte");',
							'Derrubada dos Containers / Redução de Recursos: paralisação dos containers da aplicação e do banco de dados no ambiente de nuvem (Docker stop), liberando a memória RAM e CPU alocadas;',
							'Bloqueio de Tokens e Requisições de API: rejeição automática de qualquer requisição Bearer Token ou chamada de API originada das aplicações do cliente (402 Payment Required ou 403 Forbidden);',
							'Inativação de Certificados SSL / Reencaminhamento de DNS: desativação da gestão de rotas e certificados HTTPS daquele domínio.'
						]
					}
				]
			},
			{
				heading: '4. Medidas Finais e Rescisão por Inadimplência (D30 de atraso)',
				blocks: [
					{ p: 'Após 30 dias de inadimplência contínua:' },
					{
						list: [
							'Rescisão Unilateral do Contrato: o contrato é considerado rescindido por quebra de cláusula financeira por parte do cliente;',
							'Desalocação do Banco de Dados e Limpeza (Purge): destruição dos recursos de servidor ativos e remoção do ambiente de produção;',
							'Cobrança Judicial / Extrajudicial: envio do débito proporcional (pro rata) acumulado referente ao período de uso do servidor para protesto ou cobrança bancária;',
							'Retenção de Arquivos para Baixa: o cliente só recuperará a conta e o direito de baixar seus backups após a quitação de todos os débitos em aberto acrescidos de multa e juros contratuais.'
						]
					}
				]
			},
			{
				heading: '5. O Instrumento de Cobrança: Título Executivo Extrajudicial',
				blocks: [
					{
						p: 'Para cobrar uma dívida na Justiça sem depender de um processo demorado (Ação de Conhecimento), o contrato precisa ser um Título Executivo Extrajudicial (Artigo 784, III do Código de Processo Civil). Com isso, em caso de não pagamento, a NOXACLOUD pode ingressar diretamente com uma Ação de Execução de Título Extrajudicial, na qual o juiz cita o devedor para pagar em 3 dias sob pena de penhora imediata de contas bancárias (via sistema SISBAJUD). Para ter essa força executiva, o contrato precisa de:'
					},
					{
						list: [
							'Assinatura Digital com Validade Jurídica: assinado no Portal da Noxacloud via token/hash/IP (respaldado pela Medida Provisória nº 2.200-2/2001) ou o retorno das vias físicas assinadas à mão;',
							'Duas Testemunhas: no final do contrato (tanto digital quanto físico), consta o campo para 2 testemunhas (podem ser sócios, funcionários da Noxacloud ou assinaturas digitais).'
						]
					}
				]
			},
			{
				heading: '6. Cláusulas de Resolução Jurídica',
				blocks: [
					{
						p: 'A) Multa, Juros e Atualização Monetária: Em caso de inadimplemento no pagamento de qualquer fatura de infraestrutura, taxa de serviço ou parcela do setup, o valor devido será acrescido de multa moratória de 2% (dois por cento) sobre o valor do débito, mais juros de mora de 1% (um por cento) ao mês, calculados pro rata die, e atualização monetária pelo índice IGPM/FGV (ou IPCA) até a data da efetiva quitação.'
					},
					{
						p: 'B) Protesto em Cartório e Negativação (SPC/Serasa): O atraso superior a 15 (quinze) dias no pagamento das faturas autoriza a NOXACLOUD, a seu exclusivo critério, a realizar o protesto do título em Cartório de Títulos e Documentos e a inclusão do nome e CNPJ do CONTRATANTE nos órgãos de proteção ao crédito (SPC/Serasa), independentemente de prévia notificação judicial.'
					},
					{
						p: 'C) Eleição de Foro e Custas Sucumbenciais: Para dirimir quaisquer controvérsias oriundas do presente contrato, as partes elegem expressamente o Foro da Comarca sede da NOXACLOUD, com renúncia expressa a qualquer outro, por mais privilegiado que seja. Em caso de execução judicial de débitos, o CONTRATANTE responderá também pelo pagamento de todas as custas processuais e honorários advocatícios fixados em 20% (vinte por cento) sobre o valor total da dívida.'
					}
				]
			}
		]
	},
	{
		title: 'Pagamento e Faturamento',
		subsections: [
			{
				heading: '1. Padrão Tecnológico e Autonomia de Arquitetura',
				blocks: [
					{
						p: '1.1. A NOXACLOUD desenvolve e entrega suas soluções utilizando exclusivamente sua arquitetura e padrão técnico proprietários, cujas tecnologias, linguagens e frameworks são definidos a seu exclusivo critério de engenharia.'
					},
					{
						p: '1.2. A NOXACLOUD detém total autonomia para atualizar, alterar ou evoluir a stack tecnológica e a estrutura de software aplicada aos projetos, não possuindo qualquer obrigação de implementar, adaptar ou migrar soluções para linguagens ou tecnologias solicitadas pelo CONTRATANTE.'
					}
				]
			},
			{
				heading: '2. Composição da Primeira Cobrança (Adesão ao Contrato)',
				blocks: [
					{ p: '2.1. O valor do contrato inicial é composto pela soma de dois valores distintos:' },
					{
						list: [
							'(a) Taxa de Construção (Setup): Valor variável definido em proposta comercial com base na complexidade das features, escopo funcional e especificidades solicitadas pelo CONTRATANTE;',
							'(b) Primeira Mensalidade de Infraestrutura e SLA: Valor correspondente ao primeiro ciclo de hospedagem gerenciada, suporte e manutenção.'
						]
					},
					{
						p: '2.2. Isenção da Mensalidade Inicial em Infraestrutura Própria: Caso o CONTRATANTE opte por utilizar servidores e infraestrutura próprios no momento do fechamento, a cobrança da primeira mensalidade de hospedagem gerenciada será isenta, permanecendo devida apenas a Taxa de Construção.'
					}
				]
			},
			{
				heading: '3. Modelo de Recorrência e Repasse de Custos',
				blocks: [
					{ p: '3.1. As mensalidades subsequentes são destinadas à manutenção contínua do serviço e compostas por:' },
					{
						list: [
							'(a) Repasse Direto de Custos de Infraestrutura: Repasse do custo operacional bruto dos servidores e recursos de computação em nuvem alocados para o projeto;',
							'(b) Taxa de Serviço e SLA: Valor fixo mensal referente à gestão de ambiente, monitoramento, atualizações preventivas e suporte contínuo.'
						]
					},
					{
						p: '3.2. Solicitações de Modificação e Manutenção Extra: Solicitações de alteração no código-fonte, novas features ou ajustes que extrapolem a manutenção preventiva prevista na assinatura estarão sujeitas a orçamento adicional e cobrança de taxa de desenvolvimento extra, variando conforme a complexidade e esforço computacional demandados.'
					}
				]
			},
			{
				heading: '4. Termos e Isenção de Responsabilidade para Infraestrutura Própria e Alterações Externas',
				blocks: [
					{
						p: '4.1. Isenção de Responsabilidade em Servidor do Cliente: Optando o CONTRATANTE por hospedar o projeto em infraestrutura própria ou de terceiros sob sua gestão:'
					},
					{
						list: [
							'(a) A NOXACLOUD fica totalmente isenta de qualquer responsabilidade por incidentes de segurança, invasões, vazamentos de dados, indisponibilidade de serviço, perda de backups ou gargalos de performance;',
							'(b) A gestão de segurança, certificados, firewalls e integridade do ambiente passa a ser de 100% de responsabilidade do CONTRATANTE.'
						]
					},
					{
						p: '4.2. Alterações de Código por Terceiros: Caso o código-fonte entregue seja alterado, manipulado ou editado por terceiros não autorizados ou pelo próprio CONTRATANTE, cessa imediatamente qualquer garantia de funcionamento fornecida pela NOXACLOUD, ficando qualquer intervenção corretiva sujeita à cobrança de taxa de desenvolvimento adicional.'
					}
				]
			}
		]
	},
	{
		title: 'Encerramento de Contrato',
		subsections: [
			{
				heading: '1. Direito de Cancelamento e Autonomia do Usuário',
				blocks: [
					{
						p: '1.1. O CONTRATANTE poderá solicitar o cancelamento do serviço prestado pela NOXACLOUD a qualquer momento, diretamente por meio do Portal do Cliente ou pelos canais oficiais de suporte, sem a imposição de barreiras injustificadas, em estrita observância ao princípio da transparência e ao livre exercício do consumidor.'
					}
				]
			},
			{
				heading: '2. Portabilidade de Dados e Propriedade Intelectual (LGPD - Art. 18, V)',
				blocks: [
					{
						p: '2.1. Em conformidade com o Artigo 18, inciso V da Lei Geral de Proteção de Dados (LGPD), a NOXACLOUD garante ao CONTRATANTE o direito integral à portabilidade de seus dados e do código-fonte desenvolvido sob medida.'
					},
					{ p: '2.2. O CONTRATANTE terá acesso para exportação/download completo dos seguintes ativos do projeto:' },
					{
						list: [
							'(a) Código-fonte do Frontend e Backend;',
							'(b) Arquivos de configuração de infraestrutura e orquestração (Docker/Docker Compose);',
							'(c) Arquivo de backup completo do banco de dados PostgreSQL com todos os dados pertencentes ao CONTRATANTE.'
						]
					},
					{
						p: '2.3. Obrigação de Manutenção de Conta: Para exercer o direito de download dos backups e do código-fonte, o CONTRATANTE obriga-se a não excluir a sua conta no Portal do Cliente Noxacloud antes do término completo do processo de exportação. A exclusão definitiva da conta implicará na revogação do acesso ao painel de downloads.'
					}
				]
			},
			{
				heading: '3. Condições Financeiras e Taxas no Cancelamento',
				blocks: [
					{
						p: '3.1. Isenção da Taxa de Serviço: A partir do momento da solicitação formal de cancelamento, fica 100% extinta e isenta qualquer cobrança referente a taxas de serviço de suporte, manutenção contínua, SLA operacional ou margem de gestão da NOXACLOUD.'
					},
					{
						p: '3.2. Custos de Infraestrutura e Fatura Proporcional: O CONTRATANTE permanece responsável única e exclusivamente pelo pagamento do consumo residual do servidor e infraestrutura de nuvem decorrido durante o período de uso até o efetivo desligamento, valor este que será consolidado e cobrado na fatura de encerramento do ciclo vigente.'
					}
				]
			},
			{
				heading: '4. Efetivação do Desligamento e Encerramento do Projeto',
				blocks: [
					{
						p: '4.1. O projeto e seus respectivos serviços mantidos no ambiente de nuvem da NOXACLOUD serão oficialmente desativados e encerrados somente após o cumprimento cumulativo de duas condições:'
					},
					{
						list: [
							'(a) Liquidação integral da fatura de encerramento contendo exclusivamente os custos pro rata do servidor;',
							'(b) Disponibilização prévia e completa de todos os arquivos de backup e código-fonte no Portal do Cliente para download.'
						]
					},
					{
						p: '4.2. Após a quitação da fatura final e a disponibilização dos artefatos, os ambientes e containers de computação alocados para o CONTRATANTE serão descontinuados, aplicando-se a eliminação segura dos dados dos servidores ativos em conformidade com o Artigo 16 da LGPD, resguardada a retenção legal de registros exigida pelo Marco Civil da Internet (Lei nº 12.965/2014).'
					}
				]
			},
			{
				heading: '5. Direito de Retomada e Reativação do Projeto',
				blocks: [
					{
						p: '5.1. O CONTRATANTE poderá solicitar a reativação de seus serviços e o redeploy do seu projeto na infraestrutura da NOXACLOUD a qualquer momento após o cancelamento, desde que mantida a integridade de sua conta no Portal do Cliente e respeitados os prazos legais de retenção de cadastros.'
					},
					{
						p: '5.2. Atualização de Valores e Tabela Vigente: A retomada do projeto estará sujeita aos custos de servidor e taxas de serviço vigentes na data da solicitação de reativação, não garantindo a manutenção dos preços, planos ou condições comerciais contratados no período anterior ao cancelamento.'
					},
					{
						p: '5.3. Processo de Reativação: A restauração do ambiente dependerá do envio/disponibilização do código-fonte e backup do banco de dados mantidos pelo CONTRATANTE ou arquivados no portal, bem como da quitação de eventuais débitos anteriores e do aceite do novo termo de adesão comercial.'
					}
				]
			}
		]
	},
	{
		title: 'Segurança e Privacidade',
		subsections: [
			{
				heading: 'Cláusula Quarta — Proteção de Dados, Criptografia e Cookies',
				blocks: [
					{
						p: '4.1. Proteção Universal de Dados Identificáveis (Privacy by Design): Em estrita observância à Lei Geral de Proteção de Dados (LGPD), todos os dados que possam identificar individualmente uma pessoa física, seja ela o CONTRATANTE ou os clientes finais do CONTRATANTE, serão obrigatoriamente armazenados de forma criptografada ou anonimizada por hash no banco de dados.'
					},
					{
						p: '4.2. Escopo de Dados Protegidos por Criptografia e Hashing: A proteção criptográfica e a irreversibilidade de hashes aplicam-se, obrigatoriamente e sem exceções, às seguintes categorias de informação:'
					},
					{
						list: [
							'(a) Credenciais de acesso (senhas de usuários, chaves de API, tokens e secrets de autenticação);',
							'(b) Endereços de e-mail e nomes de usuário;',
							'(c) Documentos de identificação pessoal (CPF, RG, CNPJ);',
							'(d) Endereços IP, logs de conexão e identificadores de dispositivos (user-agents);',
							'(e) Dados de localização geográfica e endereços residenciais/comerciais;',
							'(f) Dados financeiros, dados bancários e histórico de meios de pagamento;',
							'(g) Quaisquer outros dados pessoais diretos ou indiretos que permitam a identificação do indivíduo.'
						]
					},
					{
						p: '4.3. Preservação da Criptografia em Backups e Exportações: A garantia de exportação e portabilidade do banco de dados (prevista na Cláusula 3.2) não remove nem descriptografa os dados sensíveis e credenciais contidos no backup. Mesmo após o download integral da base de dados pelo CONTRATANTE, as informações identificáveis e hashes permanecerão protegidas e criptografadas na estrutura do banco.'
					},
					{
						p: '4.4. Vedação à Escolha Manual de Secrets e Chaves de Segurança: Por razões estritas de segurança da arquitetura e conformidade legal:'
					},
					{
						list: [
							'(a) O CONTRATANTE não possui permissão para definir, alterar manualmente ou escolher secrets de criptografia, chaves privadas (private keys), algoritmos de hash ou chaves HMAC da aplicação;',
							'(b) A geração, rotação e gerenciamento de todas as chaves de segurança e secrets de ambiente são de competência e governança exclusivas dos sistemas automatizados da NOXACLOUD.'
						]
					},
					{
						p: '4.5. Acesso Exclusivo a Dados Pessoais via Código Core (Backend): A leitura, descriptografia e obtenção dos dados dos clientes do CONTRATANTE ocorrem exclusivamente por meio das rotas e regras de negócio codificadas no Backend (Código Core) da aplicação, mediante autenticação válida e autorizada. A NOXACLOUD não fornecerá mecanismos, ferramentas ou chaves mestras para descriptografia em massa direta no banco de dados, garantindo a rastreabilidade, auditabilidade e segurança da informação em conformidade com o Artigo 46 da LGPD.'
					},
					{
						p: '4.6. Coleta e Uso de Cookies Estritamente Necessários: A NOXACLOUD e as aplicações por ela desenvolvidas utilizam apenas cookies e dados de conexão estritamente necessários para o correto funcionamento das plataformas, segurança da infraestrutura e fornecimento dos serviços contratados. A NOXACLOUD declara expressamente que não realiza coleta de métricas excessivas, rastreamento de perfil comercial para terceiros ou venda de dados de navegação.'
					},
					{
						p: '4.7. Finalidades e Escopo da Coleta de Dados de Conexão: Os cookies, registros e identificadores coletados possuem finalidades específicas e restritas às seguintes operações:'
					},
					{
						list: [
							'(a) Endereços IP e Logs de Servidor: coletados obrigatoriamente para identificação de acessos, prevenção contra ataques cibernéticos (ex: negação de serviço/DDoS, ataques de brute-force), proteção da infraestrutura e cumprimento do dever legal de guarda de registros previsto no Artigo 15 do Marco Civil da Internet (Lei nº 12.965/2014);',
							'(b) Tokens e Sessões de Autenticação: armazenados de forma segura em cookies httpOnly e secure no navegador, utilizados exclusivamente para manter a sessão do usuário ativa e autenticada no Portal do Cliente e nas APIs;',
							'(c) Integrações de Terceiros Necessárias (ex: serviços Google): dados estritamente exigidos para o funcionamento de ferramentas integradas indispensáveis, tais como verificação de segurança contra bots (Google reCAPTCHA), serviços de mapa/localização ou métricas essenciais de desempenho de infraestrutura.'
						]
					},
					{
						p: '4.8. Consentimento e Permissões do Usuário: A coleta e o processamento de cookies, dados de telemetria ou métricas que não sejam estritamente enquadrados como obrigação legal ou essenciais para a segurança do sistema dependerão da autorização expressa e prévia do usuário (seja o CONTRATANTE ou o cliente final), concedida por meio dos avisos de privacidade e painéis de consentimento da plataforma.'
					},
					{
						p: '4.9. Impacto da Recusa ou Revogação de Permissões: O usuário possui total liberdade para recusar, limitar ou revogar as permissões e cookies opcionais a qualquer tempo. Contudo, o CONTRATANTE e seus usuários ficam cientes e concordam que:'
					},
					{
						list: [
							'(a) A desativação ou recusa de determinados cookies, identificadores ou conexões com serviços essenciais (incluindo validações de segurança e autenticação) poderá causar instabilidade, perda de desempenho, falha de navegação ou o bloqueio completo de funcionalidades do sistema;',
							'(b) A NOXACLOUD fica totalmente isenta de responsabilidade por erros, falhas de autenticação ou indisponibilidade de recursos decorrentes da recusa ou bloqueio de cookies e permissões necessárias por parte do usuário.'
						]
					}
				]
			}
		]
	},
	{
		title: 'Infraestrutura e Nível de Serviço',
		subsections: [
			{
				heading: '1. Isenção de Responsabilidade por Indisponibilidade de Provedores de Nuvem (Cloud Providers)',
				blocks: [
					{
						p: '1.1. A NOXACLOUD atua na gestão, orquestração e desenvolvimento de softwares, não sendo proprietária dos data centers físicos onde as aplicações e bancos de dados são hospedados.'
					},
					{
						p: '1.2. A NOXACLOUD fica totalmente isenta de qualquer responsabilidade financeira, jurídica ou dever de indenização (incluindo perdas, lucros cessantes ou danos indiretos) por indisponibilidades, quedas globais, falhas regionais de rede ou incidentes operacionais causados diretamente pelos provedores de infraestrutura de nuvem contratados (ex: AWS, Microsoft Azure, Oracle Cloud, entre outros).'
					}
				]
			},
			{
				heading: '2. Livre Escolha da Arquitetura de Infraestrutura pelo Cliente',
				blocks: [
					{
						p: '2.1. O CONTRATANTE declara ciência de que a estabilidade e a resiliência de seu projeto dependem diretamente da arquitetura de hospedagem por ele contratada junto à NOXACLOUD:'
					},
					{
						list: [
							'(a) Infraestrutura Simples (Single Cloud): o CONTRATANTE reconhece que o projeto estará sujeito às eventuais interrupções, manutenções ou falhas do provedor de nuvem escolhido, sem qualquer garantia de redundância externa;',
							'(b) Infraestrutura Rotativa / Multi-Cloud (AWS / Azure / Oracle Cloud): caso o CONTRATANTE opte por contratar planos com redundância rotativa multi-nuvem, a NOXACLOUD configurará mecanismos de failover e balanceamento entre diferentes provedores.'
						]
					},
					{
						p: '2.2. Inexistência de Garantia de Uptime Absoluto (100%): A contratação de infraestrutura rotativa ou multi-nuvem diminui significativamente o risco de indisponibilidade, mas não garante funcionamento ininterrupto de 100% (cem por cento) do tempo, haja vista a dependência de redes globais de internet, roteamentos de DNS e integrações de terceiros alheios ao controle da NOXACLOUD.'
					}
				]
			},
			{
				heading: '3. Limitação Financeira e Isenção por Lucros Cessantes',
				blocks: [
					{
						p: '3.1. Independentemente da arquitetura escolhida (Single Cloud ou Multi-Cloud), eventual compensação financeira ou desconto de SLA concedido pela NOXACLOUD em decorrência de falhas comprovadamente sob sua responsabilidade técnica direta estará estritamente limitado ao valor pro rata da taxa de serviço da mensalidade vigente, ficando expressamente vedada qualquer indenização por lucros cessantes, vendas não realizadas ou interrupção de negócios do CONTRATANTE.'
					}
				]
			},
			{
				heading: '4. Garantia de Disponibilidade (SLA)',
				blocks: [
					{
						p: '4.1. A NOXACLOUD estabelece uma meta de Nível de Serviço (SLA) de 99,5% (noventa e nove vírgula cinco por cento) de disponibilidade mensal para os ambientes hospedados diretamente em sua infraestrutura gerenciada.'
					},
					{
						p: '4.2. Definição de Indisponibilidade: Considera-se indisponibilidade exclusivamente o período de tempo contínuo em que a aplicação principal ou o banco de dados PostgreSQL do CONTRATANTE ficarem totalmente inacessíveis para requisições de rede originadas de fontes externas válidas, por falhas decorrentes de configurações ou scripts de responsabilidade direta da NOXACLOUD.'
					}
				]
			},
			{
				heading: '5. Janelas de Manutenção Programada (Exclusão do Cálculo de SLA)',
				blocks: [
					{
						p: '5.1. Para garantir a segurança, atualização de pacotes do sistema operacional, otimização de banco de dados e estabilidade dos ambientes, a NOXACLOUD reserva-se o direito de realizar intervenções técnicas na infraestrutura.'
					},
					{
						p: '5.2. Horário e Notificação da Janela Programada: As manutenções preventivas e atualizações ordinárias serão preferencialmente realizadas em janelas de madrugada, compreendidas entre 01:00h e 05:00h (horário de Brasília).'
					},
					{
						p: '5.3. As manutenções programadas serão notificadas ao CONTRATANTE via Portal do Cliente ou e-mail com antecedência mínima de 24 (vinte e quatro) horas.'
					},
					{
						p: '5.4. Isenção no Cálculo de SLA: A paralisação temporária dos serviços durante as janelas de manutenção programada, bem como durante a execução de backups automatizados de rotina, não será computada como tempo de indisponibilidade ou queda do SLA contratual.'
					}
				]
			},
			{
				heading: '6. Manutenções Emergenciais de Segurança',
				blocks: [
					{
						p: '6.1. Em situações extraordinárias de risco crítico, tais como a necessidade de aplicar correções imediatas de segurança (patches de vulnerabilidade zero-day), conter ataques cibernéticos (ex: DDoS) ou mitigar falhas iminentes de hardware nos provedores de nuvem, a NOXACLOUD poderá executar manutenções emergenciais a qualquer horário, sem a necessidade do aviso prévio com 24h de antecedência.'
					},
					{
						p: '6.2. A intervenção emergencial será informada ao CONTRATANTE assim que iniciada no Portal do Cliente, e o tempo estritamente necessário para neutralizar a ameaça de segurança também não será contabilizado como violação de SLA.'
					}
				]
			},
			{
				heading: '7. Exceções Globais ao SLA',
				blocks: [
					{
						p: '7.1. Além das manutenções programadas e emergenciais, não constituem descumprimento de SLA nem geram direito a qualquer compensação:'
					},
					{
						list: [
							'(a) Indisponibilidades decorrentes de falhas em provedores globais de nuvem (conforme regras de infraestrutura Single Cloud e Multi-Cloud);',
							'(b) Interrupções provocadas por recusa de cookies essenciais, bloqueios de navegadores ou inconsistências em scripts/APIs de terceiros (ex: serviços Google);',
							'(c) Suspensão temporária do ambiente por inadimplência no pagamento da fatura (conforme réguas de cobrança D1-D30);',
							'(d) Falhas na conexão de internet do próprio CONTRATANTE ou de seus usuários finais;',
							'(e) Alterações no código-fonte ou banco de dados realizadas por terceiros não autorizados ou pelo próprio CONTRATANTE.'
						]
					}
				]
			}
		]
	},
	{
		title: 'Contrato',
		subsections: [
			{
				heading: 'Cláusula Primeira — Padrão Tecnológico e Modelo de Cobrança',
				blocks: [
					{
						p: '1.1. Autonomia de Arquitetura e Padrão Tecnológico: A NOXACLOUD desenvolve e entrega suas soluções utilizando exclusivamente sua arquitetura e padrão técnico proprietários, cujas linguagens, frameworks, bancos de dados e ferramentas de infraestrutura são definidos a seu exclusivo critério de engenharia. A NOXACLOUD detém total autonomia para atualizar ou evoluir a stack tecnológica dos projetos, não possuindo qualquer obrigação de implementar, adaptar ou migrar soluções para linguagens ou tecnologias solicitadas pelo CONTRATANTE.'
					},
					{ p: '1.2. Composição do Valor Inicial: O valor do contrato inicial é composto por:' },
					{
						list: [
							'(a) Taxa de Construção (Setup): Valor variável definido em proposta comercial com base na complexidade do projeto, features e especificidades solicitadas;',
							'(b) Primeira Mensalidade de Infraestrutura e SLA: Valor referente ao primeiro ciclo de hospedagem gerenciada, suporte e manutenção.'
						]
					},
					{
						p: '1.3. Isenção da Primeira Mensalidade em Infraestrutura Própria: Caso o CONTRATANTE opte por utilizar servidores e infraestrutura próprios no momento do fechamento, a cobrança da primeira mensalidade de hospedagem gerenciada será isenta, permanecendo devida apenas a Taxa de Construção.'
					},
					{
						p: '1.4. Modelo de Recorrência e Repasse de Custos: As mensalidades subsequentes destinam-se à manutenção contínua do serviço e são compostas por:'
					},
					{
						list: [
							'(a) Repasse Direto de Custos de Infraestrutura: Custos operacionais brutos dos servidores e recursos em nuvem alocados para o projeto;',
							'(b) Taxa de Serviço e SLA: Valor mensal referente à gestão de ambiente, monitoramento, atualizações preventivas e suporte contínuo.'
						]
					},
					{
						p: '1.5. Modificações e Solicitações Adicionais: Solicitações de alteração no código-fonte, novas funcionalidades ou ajustes que extrapolem a manutenção preventiva prevista na assinatura estarão sujeitas a orçamento adicional e cobrança de taxa de desenvolvimento extra.'
					},
					{
						p: '1.6. Isenção de Responsabilidade em Servidor do Cliente e Edição por Terceiros: Optando o CONTRATANTE por hospedar o projeto em infraestrutura própria ou caso o código-fonte entregue seja alterado ou manipulado por terceiros não autorizados pela NOXACLOUD:'
					},
					{
						list: [
							'(a) A NOXACLOUD fica totalmente isenta de qualquer responsabilidade por incidentes de segurança, invasões, vazamento de dados, indisponibilidade ou perda de performance;',
							'(b) Cessa imediatamente qualquer garantia de funcionamento fornecida pela prestadora, ficando qualquer intervenção corretiva sujeita à cobrança de taxa adicional.'
						]
					}
				]
			},
			{
				heading: 'Cláusula Segunda — Gestão Contratual, Material Físico e Sinal de Fechamento',
				blocks: [
					{
						p: '2.1. Assinatura Digital e Integridade: Todos os contratos vinculados ao CONTRATANTE permanecerão armazenados e acessíveis no Portal do Cliente Noxacloud. Os documentos firmados digitalmente possuem garantia de integridade por criptografia, sendo vedada a alteração unilateral após o aceite.'
					},
					{
						p: '2.2. Envio do Material Físico: A NOXACLOUD enviará ao endereço do CONTRATANTE, via encomenda postal, um kit físico contendo:'
					},
					{
						list: [
							'(a) Uma cópia impressa dos Termos de Serviço vigentes;',
							'(b) 3 (três) vias físicas do Contrato de Prestação de Serviços, sendo obrigatória a assinatura de todas pelo representante legal do CONTRATANTE;',
							'(c) Documentação técnica, manuais de orientação operacional do sistema e canais de contato dedicados exclusivamente ao suporte do CONTRATANTE.'
						]
					},
					{
						p: '2.3. Devolução de Vias e Digitalização: O CONTRATANTE compromete-se a assinar as 3 (três) vias recebidas, retendo 1 (uma) via para arquivo próprio e retornando obrigatoriamente 2 (duas) vias físicas assinadas para a NOXACLOUD. Recebidas as vias, a NOXACLOUD disponibilizará a cópia física digitalizada no Portal do Cliente.'
					},
					{
						p: '2.4. Condição de Efetivação do Contrato (Sinal de 30%): A formalização e o início definitivo dos serviços de desenvolvimento e alocação de infraestrutura ficam estritamente condicionados ao pagamento imediato do sinal equivalente a 30% (trinta por cento) do valor total combinado da Taxa de Construção. O contrato não será considerado fechado ou vigente sem a devida quitação e compensação bancária deste sinal de 30%, independentemente do aceite digital ou do recebimento do kit físico.'
					},
					{
						p: '2.5. Aditivos e Alterações de Contrato no Portal: Qualquer uma das partes poderá solicitar aditivos contratuais, revisão de escopo ou alterações por meio da funcionalidade de Edição de Contratos no Portal do Cliente, atribuindo um Nível de Prioridade à solicitação. A alteração só produzirá efeitos após o aceite explícito de ambas as partes dentro do painel.'
					}
				]
			},
			{
				heading: 'Cláusula Terceira — Cancelamento, Portabilidade (LGPD) e Reativação',
				blocks: [
					{
						p: '3.1. Direito ao Cancelamento e Rescisão Imediata: Tanto o CONTRATANTE quanto a NOXACLOUD podem solicitar o cancelamento e a rescisão imediata do contrato a qualquer momento, diretamente pelo Portal do Cliente ou canais oficiais de atendimento.'
					},
					{
						p: '3.2. Portabilidade de Dados e Código-Fonte (LGPD - Art. 18, V): Em estrita conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), em caso de cancelamento é garantido ao CONTRATANTE o direito de exportar e realizar o download completo de:'
					},
					{
						list: [
							'(a) Código-fonte do Frontend e Backend;',
							'(b) Arquivos de orquestração e infraestrutura (Docker/Docker Compose);',
							'(c) Arquivo de backup completo do banco de dados PostgreSQL.'
						]
					},
					{
						p: '3.3. Isenção de Taxa de Serviço no Cancelamento: A partir do pedido formal de cancelamento, fica 100% extinta qualquer cobrança de taxa de serviço, SLA ou margem de gestão da NOXACLOUD.'
					},
					{
						p: '3.4. Cobrança de Servidor e Efetivação do Desligamento: O CONTRATANTE permanece responsável única e exclusivamente pelo pagamento do consumo proporcional (pro rata) do servidor até o momento da desativação. O projeto será encerrado e desativado somente após a liquidação da fatura residual de infraestrutura e a disponibilização prévia de todos os backups no portal.'
					},
					{
						p: '3.5. Condição de Manutenção da Conta no Portal: Para exercer o direito de download dos backups e do código-fonte, o CONTRATANTE obriga-se a manter sua conta ativa no Portal do Cliente. A exclusão da conta antes do término do download implicará na impossibilidade técnica e revogação do acesso ao painel de arquivos.'
					},
					{
						p: '3.6. Direito de Retomada e Reativação: O CONTRATANTE poderá solicitar a reativação de seus serviços e o redeploy do seu projeto a qualquer momento. A reativação estará sujeita aos valores de infraestrutura e taxas de serviço vigentes na data do novo pedido, não havendo garantia de manutenção das condições comerciais anteriores.'
					}
				]
			}
		]
	}
];

export const termsMockEn: TermsSection[] = [
	{
		title: 'Late Payment',
		subsections: [
			{
				heading: '1. Administrative and Support Limitations (D1 to D3 past due)',
				blocks: [
					{
						p: "In this first phase, the client's site/app keeps working for its end customers, but Noxacloud portal privileges are cut off:"
					},
					{
						list: [
							'Technical Support and SLA: immediate suspension of assistance, tickets, or inquiries;',
							'New Changes or Features: any code change, layout adjustment, or pending deploy is blocked;',
							'Contract Edit Requests: new addenda or changes can no longer be registered in the portal;',
							'Shipping of the Physical Kit (for new clients): postal shipment of the contract copies is withheld until the down payment/invoice clears.'
						]
					}
				]
			},
			{
				heading: '2. Portal Access and Operation Limitations (D5 to D7 past due)',
				blocks: [
					{ p: 'The delay already starts to affect day-to-day platform use:' },
					{
						list: [
							'Backup and Code Export: download of the PostgreSQL dump, source code, and Docker files is blocked, since export requires a current, paid-up account;',
							"Client Administrative Panel: access to metrics, internal reports, or record management inside the client's portal is blocked;",
							'Access to Public API Keys: the API key generation/lookup panel is temporarily disabled.'
						]
					}
				]
			},
			{
				heading: '3. Infrastructure Limitations and Service Blackout (D8 to D15 past due)',
				blocks: [
					{
						p: 'If the infrastructure and service invoice is not paid after the collection schedule and formal notices, computing resources are cut off to stop NOXACLOUD\'s costs from accruing:'
					},
					{
						list: [
							'Suspension/Blackout Page on the Frontend: the client\'s site/platform is replaced with a generic screen (e.g., "Service temporarily unavailable, contact support");',
							'Container Shutdown / Resource Reduction: application and database containers in the cloud environment are stopped (Docker stop), releasing the allocated RAM and CPU;',
							'Token and API Request Blocking: any Bearer Token request or API call originating from the client\'s applications is automatically rejected (402 Payment Required or 403 Forbidden);',
							'SSL Certificate Deactivation / DNS Rerouting: route and HTTPS certificate management for that domain is deactivated.'
						]
					}
				]
			},
			{
				heading: '4. Final Measures and Termination for Default (D30 past due)',
				blocks: [
					{ p: 'After 30 days of continuous default:' },
					{
						list: [
							"Unilateral Termination of the Contract: the contract is deemed terminated due to the client's breach of a financial clause;",
							'Database Deallocation and Purge: active server resources are destroyed and the production environment is removed;',
							"Judicial / Extrajudicial Collection: the accumulated pro rata debt for the server usage period is sent for notarized protest or bank collection;",
							"File Retention Pending Settlement: the client will only regain account access and the right to download its backups after settling all outstanding debts plus contractual penalties and interest."
						]
					}
				]
			},
			{
				heading: '5. The Collection Instrument: Extrajudicial Enforceable Instrument',
				blocks: [
					{
						p: "To collect a debt in court without relying on a lengthy ordinary lawsuit (Ação de Conhecimento), the contract must qualify as an Extrajudicial Enforceable Instrument (Título Executivo Extrajudicial, Article 784, III of the Brazilian Code of Civil Procedure). This lets NOXACLOUD, in case of non-payment, file directly for an extrajudicial enforcement action (Ação de Execução de Título Extrajudicial), in which the judge summons the debtor to pay within 3 days under penalty of immediate seizure of bank accounts (via the SISBAJUD system). For the contract to carry this enforceable force, it needs:"
					},
					{
						list: [
							'Legally Valid Digital Signature: signed on the Noxacloud Portal via token/hash/IP (backed by Provisional Measure No. 2,200-2/2001) or the return of the hand-signed physical copies;',
							'Two Witnesses: both the digital and physical versions include a field for 2 witnesses (who may be partners, Noxacloud employees, or digital signatories).'
						]
					}
				]
			},
			{
				heading: '6. Legal Resolution Clauses',
				blocks: [
					{
						p: 'A) Penalty, Interest, and Monetary Adjustment: In case of default on any infrastructure invoice, service fee, or setup installment, the amount owed will be increased by a 2% (two percent) late-payment penalty on the debt amount, plus 1% (one percent) monthly default interest calculated pro rata die, and monetary adjustment by the IGPM/FGV index (or IPCA) until the date of actual settlement.'
					},
					{
						p: "B) Notarized Protest and Credit Bureau Listing (SPC/Serasa): A delay of more than 15 (fifteen) days in paying invoices authorizes NOXACLOUD, at its sole discretion, to protest the instrument at a Notary of Titles and Documents and to list the CLIENT's name and CNPJ with credit protection bureaus (SPC/Serasa), regardless of prior judicial notice."
					},
					{
						p: "C) Choice of Venue and Losing-Party Costs: To settle any disputes arising from this contract, the parties expressly choose the venue of NOXACLOUD's home jurisdiction, expressly waiving any other, however privileged. In case of judicial debt enforcement, the CLIENT will also be liable for all court costs and attorney's fees set at 20% (twenty percent) of the total debt amount."
					}
				]
			}
		]
	},
	{
		title: 'Payment and Billing',
		subsections: [
			{
				heading: '1. Technology Standard and Architectural Autonomy',
				blocks: [
					{
						p: '1.1. NOXACLOUD develops and delivers its solutions exclusively using its own proprietary architecture and technical standard, whose technologies, languages, and frameworks are defined at its sole engineering discretion.'
					},
					{
						p: '1.2. NOXACLOUD retains full autonomy to update, change, or evolve the technology stack and software structure applied to projects, with no obligation to implement, adapt, or migrate solutions to languages or technologies requested by the CLIENT.'
					}
				]
			},
			{
				heading: '2. Composition of the First Charge (Contract Onboarding)',
				blocks: [
					{ p: '2.1. The initial contract amount is composed of the sum of two distinct amounts:' },
					{
						list: [
							"(a) Build Fee (Setup): a variable amount set in the commercial proposal based on feature complexity, functional scope, and specifics requested by the CLIENT;",
							'(b) First Infrastructure and SLA Monthly Fee: the amount corresponding to the first cycle of managed hosting, support, and maintenance.'
						]
					},
					{
						p: "2.2. Waiver of the Initial Monthly Fee for Self-Hosted Infrastructure: Should the CLIENT choose to use its own servers and infrastructure at closing, the first managed-hosting monthly fee is waived, with only the Build Fee remaining due."
					}
				]
			},
			{
				heading: '3. Recurring Fee Model and Cost Pass-Through',
				blocks: [
					{ p: '3.1. Subsequent monthly fees are for the ongoing maintenance of the service and consist of:' },
					{
						list: [
							'(a) Direct Pass-Through of Infrastructure Costs: pass-through of the gross operating cost of the servers and cloud computing resources allocated to the project;',
							'(b) Service and SLA Fee: a fixed monthly amount for environment management, monitoring, preventive updates, and ongoing support.'
						]
					},
					{
						p: '3.2. Modification Requests and Extra Maintenance: requests to change the source code, add new features, or make adjustments beyond the preventive maintenance covered by the subscription are subject to an additional quote and an extra development fee, varying with the complexity and computational effort required.'
					}
				]
			},
			{
				heading: '4. Terms and Liability Waiver for Self-Hosted Infrastructure and External Changes',
				blocks: [
					{
						p: '4.1. Liability Waiver on Client-Managed Servers: Should the CLIENT choose to host the project on its own infrastructure or on third-party infrastructure under its management:'
					},
					{
						list: [
							'(a) NOXACLOUD is entirely released from any liability for security incidents, intrusions, data leaks, service unavailability, backup loss, or performance bottlenecks;',
							"(b) Management of security, certificates, firewalls, and environment integrity becomes 100% the CLIENT's responsibility."
						]
					},
					{
						p: '4.2. Third-Party Code Changes: Should the delivered source code be altered, manipulated, or edited by unauthorized third parties or by the CLIENT itself, any functionality warranty provided by NOXACLOUD ceases immediately, and any corrective intervention becomes subject to an additional development fee.'
					}
				]
			}
		]
	},
	{
		title: 'Contract Termination',
		subsections: [
			{
				heading: "1. Right to Cancel and the User's Autonomy",
				blocks: [
					{
						p: "1.1. The CLIENT may request cancellation of the service provided by NOXACLOUD at any time, directly through the Client Portal or official support channels, with no unjustified barriers, in strict observance of the principle of transparency and the consumer's free exercise of choice."
					}
				]
			},
			{
				heading: '2. Data Portability and Intellectual Property (LGPD – Art. 18, V)',
				blocks: [
					{
						p: "2.1. In accordance with Article 18, item V of Brazil's General Data Protection Law (LGPD), NOXACLOUD guarantees the CLIENT the full right to portability of its data and of the custom-built source code."
					},
					{ p: '2.2. The CLIENT will have access to fully export/download the following project assets:' },
					{
						list: [
							'(a) Frontend and Backend source code;',
							'(b) Infrastructure and orchestration configuration files (Docker/Docker Compose);',
							"(c) A complete PostgreSQL database backup file with all data belonging to the CLIENT."
						]
					},
					{
						p: "2.3. Account Maintenance Obligation: To exercise the right to download backups and source code, the CLIENT undertakes not to delete its Noxacloud Client Portal account before the export process is fully complete. Permanent account deletion will revoke access to the downloads panel."
					}
				]
			},
			{
				heading: '3. Financial Conditions and Fees on Cancellation',
				blocks: [
					{
						p: '3.1. Service Fee Waiver: From the moment of the formal cancellation request, any charge for support service fees, ongoing maintenance, operational SLA, or NOXACLOUD management margin is 100% extinguished and waived.'
					},
					{
						p: '3.2. Infrastructure Costs and Pro-Rated Invoice: The CLIENT remains solely and exclusively responsible for paying the residual server and cloud infrastructure consumption accrued during the usage period up to actual deactivation, an amount that will be consolidated and billed on the current cycle\'s closing invoice.'
					}
				]
			},
			{
				heading: '4. Completion of Deactivation and Project Closure',
				blocks: [
					{
						p: "4.1. The project and its services kept in NOXACLOUD's cloud environment will be officially deactivated and closed only after both of the following conditions are cumulatively met:"
					},
					{
						list: [
							'(a) Full settlement of the closing invoice, containing exclusively the pro-rated server costs;',
							"(b) Prior, complete availability of all backup files and source code in the Client Portal for download."
						]
					},
					{
						p: "4.2. After the final invoice is settled and the artifacts are made available, the computing environments and containers allocated to the CLIENT will be decommissioned, with secure deletion of data on active servers in accordance with Article 16 of the LGPD, subject to the legal record-retention period required by Brazil's Internet Civil Framework (Marco Civil da Internet, Law No. 12,965/2014)."
					}
				]
			},
			{
				heading: '5. Right to Resume and Reactivate the Project',
				blocks: [
					{
						p: "5.1. The CLIENT may request reactivation of its services and redeployment of its project on NOXACLOUD's infrastructure at any time after cancellation, provided its Client Portal account remains intact and the legal record-retention periods are respected."
					},
					{
						p: '5.2. Updated Pricing and Current Rate Table: Resuming the project will be subject to the server costs and service fees in effect on the date of the reactivation request, with no guarantee that the prices, plans, or commercial terms from before cancellation will be maintained.'
					},
					{
						p: '5.3. Reactivation Process: Restoring the environment will depend on the CLIENT providing the source code and database backup it kept, or those archived in the portal, as well as settling any prior debts and accepting the new commercial onboarding terms.'
					}
				]
			}
		]
	},
	{
		title: 'Security and Privacy',
		subsections: [
			{
				heading: 'Fourth Clause — Data Protection, Encryption, and Cookies',
				blocks: [
					{
						p: "4.1. Universal Protection of Identifiable Data (Privacy by Design): In strict observance of Brazil's General Data Protection Law (LGPD), all data that could individually identify a natural person — whether the CLIENT or the CLIENT's end customers — will be mandatorily stored encrypted or hash-anonymized in the database."
					},
					{
						p: '4.2. Scope of Data Protected by Encryption and Hashing: Cryptographic protection and hash irreversibility mandatorily and without exception apply to the following categories of information:'
					},
					{
						list: [
							'(a) Access credentials (user passwords, API keys, tokens, and authentication secrets);',
							'(b) Email addresses and usernames;',
							'(c) Personal identification documents (CPF, RG, CNPJ);',
							'(d) IP addresses, connection logs, and device identifiers (user agents);',
							'(e) Geographic location data and residential/business addresses;',
							'(f) Financial data, banking data, and payment method history;',
							'(g) Any other direct or indirect personal data that could identify the individual.'
						]
					},
					{
						p: "4.3. Preservation of Encryption in Backups and Exports: The database export and portability guarantee (per Clause 3.2) does not remove or decrypt the sensitive data and credentials contained in the backup. Even after the CLIENT fully downloads the database, identifiable information and hashes remain protected and encrypted within the database structure."
					},
					{
						p: '4.4. Prohibition on Manually Choosing Secrets and Security Keys: For strict architectural security and legal compliance reasons:'
					},
					{
						list: [
							"(a) The CLIENT is not permitted to define, manually change, or choose the application's encryption secrets, private keys, hashing algorithms, or HMAC keys;",
							"(b) The generation, rotation, and management of all security keys and environment secrets are the exclusive responsibility and governance of NOXACLOUD's automated systems."
						]
					},
					{
						p: "4.5. Exclusive Access to Personal Data via Core (Backend) Code: Reading, decrypting, and retrieving the CLIENT's customers' data occurs exclusively through the routes and business rules coded in the application's Backend (Core Code), subject to valid, authorized authentication. NOXACLOUD will not provide mechanisms, tools, or master keys for direct mass decryption in the database, ensuring traceability, auditability, and information security in accordance with Article 46 of the LGPD."
					},
					{
						p: "4.6. Collection and Use of Strictly Necessary Cookies: NOXACLOUD and the applications it develops use only cookies and connection data strictly necessary for the platforms to function correctly, for infrastructure security, and for delivering the contracted services. NOXACLOUD expressly states that it does not engage in excessive metrics collection, commercial profile tracking for third parties, or the sale of browsing data."
					},
					{
						p: '4.7. Purposes and Scope of Connection Data Collection: The cookies, logs, and identifiers collected serve specific purposes, strictly limited to the following operations:'
					},
					{
						list: [
							"(a) IP Addresses and Server Logs: mandatorily collected to identify access, prevent cyberattacks (e.g., denial of service/DDoS, brute-force attacks), protect the infrastructure, and comply with the legal duty to retain records under Article 15 of Brazil's Internet Civil Framework (Marco Civil da Internet, Law No. 12,965/2014);",
							"(b) Authentication Tokens and Sessions: stored securely in httpOnly and secure browser cookies, used exclusively to keep the user's session active and authenticated on the Client Portal and APIs;",
							'(c) Necessary Third-Party Integrations (e.g., Google services): data strictly required for indispensable integrated tools to function, such as bot-security verification (Google reCAPTCHA), map/location services, or essential infrastructure performance metrics.'
						]
					},
					{
						p: "4.8. User Consent and Permissions: Collection and processing of cookies, telemetry data, or metrics that do not strictly fall under a legal obligation or system-security necessity depend on the user's express, prior authorization (whether the CLIENT or the end customer), granted through the platform's privacy notices and consent panels."
					},
					{
						p: '4.9. Impact of Refusing or Revoking Permissions: Users are entirely free to refuse, limit, or revoke optional permissions and cookies at any time. However, the CLIENT and its users acknowledge and agree that:'
					},
					{
						list: [
							'(a) Disabling or refusing certain cookies, identifiers, or connections to essential services (including security and authentication checks) may cause instability, degraded performance, navigation failures, or complete blocking of system features;',
							'(b) NOXACLOUD is entirely released from liability for errors, authentication failures, or resource unavailability resulting from a user refusing or blocking necessary cookies and permissions.'
						]
					}
				]
			}
		]
	},
	{
		title: 'Infrastructure and Service Level',
		subsections: [
			{
				heading: '1. Liability Waiver for Cloud Provider Unavailability',
				blocks: [
					{
						p: '1.1. NOXACLOUD manages, orchestrates, and develops software; it does not own the physical data centers where applications and databases are hosted.'
					},
					{
						p: '1.2. NOXACLOUD is entirely released from any financial or legal liability or duty to indemnify (including losses, lost profits, or indirect damages) for unavailability, global outages, regional network failures, or operational incidents caused directly by the contracted cloud infrastructure providers (e.g., AWS, Microsoft Azure, Oracle Cloud, among others).'
					}
				]
			},
			{
				heading: "2. Client's Free Choice of Infrastructure Architecture",
				blocks: [
					{
						p: "2.1. The CLIENT acknowledges that its project's stability and resilience depend directly on the hosting architecture it has contracted with NOXACLOUD:"
					},
					{
						list: [
							'(a) Single Cloud: the CLIENT acknowledges the project will be subject to any interruptions, maintenance, or failures of the chosen cloud provider, with no guarantee of external redundancy;',
							'(b) Rotating / Multi-Cloud Infrastructure (AWS / Azure / Oracle Cloud): should the CLIENT choose a plan with rotating multi-cloud redundancy, NOXACLOUD will configure failover and load-balancing mechanisms across different providers.'
						]
					},
					{
						p: "2.2. No Guarantee of Absolute (100%) Uptime: Contracting rotating or multi-cloud infrastructure significantly reduces the risk of unavailability but does not guarantee uninterrupted operation 100% (one hundred percent) of the time, given the dependence on global internet networks, DNS routing, and third-party integrations outside NOXACLOUD's control."
					}
				]
			},
			{
				heading: '3. Financial Cap and Waiver for Lost Profits',
				blocks: [
					{
						p: "3.1. Regardless of the architecture chosen (Single Cloud or Multi-Cloud), any financial compensation or SLA credit granted by NOXACLOUD due to failures proven to be under its direct technical responsibility is strictly limited to the pro-rated value of the current monthly service fee, with any indemnification for lost profits, unrealized sales, or business interruption of the CLIENT expressly excluded."
					}
				]
			},
			{
				heading: '4. Availability Guarantee (SLA)',
				blocks: [
					{
						p: '4.1. NOXACLOUD sets a Service Level (SLA) target of 99.5% (ninety-nine point five percent) monthly availability for environments hosted directly on its managed infrastructure.'
					},
					{
						p: "4.2. Definition of Unavailability: Unavailability means exclusively the continuous period during which the CLIENT's main application or PostgreSQL database is fully inaccessible to network requests from valid external sources, due to failures arising from configurations or scripts under NOXACLOUD's direct responsibility."
					}
				]
			},
			{
				heading: '5. Scheduled Maintenance Windows (Excluded from SLA Calculation)',
				blocks: [
					{
						p: '5.1. To ensure security, operating-system package updates, database optimization, and environment stability, NOXACLOUD reserves the right to carry out technical interventions on the infrastructure.'
					},
					{
						p: '5.2. Scheduled Window Timing and Notice: preventive maintenance and routine updates will preferably take place during overnight windows, between 1:00 AM and 5:00 AM (Brasília time).'
					},
					{
						p: '5.3. Scheduled maintenance will be notified to the CLIENT via the Client Portal or email with at least 24 (twenty-four) hours\' notice.'
					},
					{
						p: '5.4. SLA Calculation Exclusion: temporary service interruption during scheduled maintenance windows, as well as during routine automated backup runs, will not be counted as downtime or an SLA breach.'
					}
				]
			},
			{
				heading: '6. Emergency Security Maintenance',
				blocks: [
					{
						p: '6.1. In extraordinary critical-risk situations — such as the need to apply immediate security fixes (zero-day vulnerability patches), contain cyberattacks (e.g., DDoS), or mitigate imminent hardware failures at cloud providers — NOXACLOUD may carry out emergency maintenance at any time, without the 24-hour advance notice otherwise required.'
					},
					{
						p: '6.2. The emergency intervention will be reported to the CLIENT via the Client Portal as soon as it begins, and the time strictly necessary to neutralize the security threat will also not be counted as an SLA violation.'
					}
				]
			},
			{
				heading: '7. Global SLA Exceptions',
				blocks: [
					{
						p: '7.1. In addition to scheduled and emergency maintenance, the following do not constitute an SLA breach and do not give rise to any compensation:'
					},
					{
						list: [
							'(a) Unavailability arising from failures at global cloud providers (per the Single Cloud and Multi-Cloud infrastructure rules);',
							'(b) Interruptions caused by refusal of essential cookies, browser blocking, or inconsistencies in third-party scripts/APIs (e.g., Google services);',
							'(c) Temporary suspension of the environment for non-payment of an invoice (per the D1–D30 collection schedule);',
							"(d) Internet connection failures on the CLIENT's side or that of its end users;",
							'(e) Changes to the source code or database made by unauthorized third parties or by the CLIENT itself.'
						]
					}
				]
			}
		]
	},
	{
		title: 'Contract',
		subsections: [
			{
				heading: 'First Clause — Technology Standard and Billing Model',
				blocks: [
					{
						p: "1.1. Architectural Autonomy and Technology Standard: NOXACLOUD develops and delivers its solutions exclusively using its own proprietary architecture and technical standard, whose languages, frameworks, databases, and infrastructure tools are defined at its sole engineering discretion. NOXACLOUD retains full autonomy to update or evolve the technology stack of its projects, with no obligation to implement, adapt, or migrate solutions to languages or technologies requested by the CLIENT."
					},
					{ p: '1.2. Composition of the Initial Amount: the initial contract amount consists of:' },
					{
						list: [
							'(a) Build Fee (Setup): a variable amount set in the commercial proposal based on project complexity, features, and requested specifics;',
							'(b) First Infrastructure and SLA Monthly Fee: the amount for the first cycle of managed hosting, support, and maintenance.'
						]
					},
					{
						p: "1.3. Waiver of the First Monthly Fee for Self-Hosted Infrastructure: Should the CLIENT choose to use its own servers and infrastructure at closing, the first managed-hosting monthly fee is waived, with only the Build Fee remaining due."
					},
					{
						p: '1.4. Recurring Fee Model and Cost Pass-Through: subsequent monthly fees are for the ongoing maintenance of the service and consist of:'
					},
					{
						list: [
							'(a) Direct Pass-Through of Infrastructure Costs: gross operating costs of the servers and cloud resources allocated to the project;',
							'(b) Service and SLA Fee: a monthly amount for environment management, monitoring, preventive updates, and ongoing support.'
						]
					},
					{
						p: '1.5. Modifications and Additional Requests: requests to change the source code, add new features, or make adjustments beyond the preventive maintenance covered by the subscription are subject to an additional quote and an extra development fee.'
					},
					{
						p: "1.6. Liability Waiver for Client-Managed Servers and Third-Party Edits: Should the CLIENT choose to host the project on its own infrastructure, or should the delivered source code be altered or manipulated by third parties not authorized by NOXACLOUD:"
					},
					{
						list: [
							'(a) NOXACLOUD is entirely released from any liability for security incidents, intrusions, data leaks, unavailability, or performance loss;',
							'(b) Any functionality warranty provided by the provider ceases immediately, and any corrective intervention becomes subject to an additional fee.'
						]
					}
				]
			},
			{
				heading: 'Second Clause — Contract Management, Physical Materials, and Closing Deposit',
				blocks: [
					{
						p: "2.1. Digital Signature and Integrity: All contracts linked to the CLIENT remain stored and accessible in the Noxacloud Client Portal. Digitally signed documents carry an integrity guarantee via encryption, and unilateral changes after acceptance are prohibited."
					},
					{
						p: '2.2. Shipping of Physical Materials: NOXACLOUD will ship to the CLIENT\'s address, by post, a physical kit containing:'
					},
					{
						list: [
							'(a) A printed copy of the current Terms of Service;',
							"(b) 3 (three) physical copies of the Service Agreement, all of which must be signed by the CLIENT's legal representative;",
							"(c) Technical documentation, system operating manuals, and contact channels dedicated exclusively to the CLIENT's support."
						]
					},
					{
						p: '2.3. Returning Copies and Digitization: the CLIENT undertakes to sign the 3 (three) copies received, keeping 1 (one) copy for its own records and returning 2 (two) signed physical copies to NOXACLOUD. Once received, NOXACLOUD will make the scanned physical copy available in the Client Portal.'
					},
					{
						p: "2.4. Condition for Contract Effectiveness (30% Deposit): formalization and the definitive start of development services and infrastructure allocation are strictly conditioned on immediate payment of a deposit equal to 30% (thirty percent) of the total agreed Build Fee. The contract will not be considered closed or in effect without due settlement and bank clearance of this 30% deposit, regardless of digital acceptance or receipt of the physical kit."
					},
					{
						p: '2.5. Addenda and Contract Changes in the Portal: either party may request contractual addenda, scope review, or changes through the Contract Editing feature in the Client Portal, assigning a priority level to the request. The change only takes effect after explicit acceptance by both parties within the panel.'
					}
				]
			},
			{
				heading: 'Third Clause — Cancellation, Portability (LGPD), and Reactivation',
				blocks: [
					{
						p: "3.1. Right to Cancel and Immediate Termination: both the CLIENT and NOXACLOUD may request cancellation and immediate termination of the contract at any time, directly through the Client Portal or official service channels."
					},
					{
						p: "3.2. Data and Source Code Portability (LGPD – Art. 18, V): in strict compliance with Brazil's General Data Protection Law (Law No. 13,709/2018), upon cancellation the CLIENT is guaranteed the right to export and fully download:"
					},
					{
						list: [
							'(a) Frontend and Backend source code;',
							'(b) Orchestration and infrastructure files (Docker/Docker Compose);',
							'(c) A complete PostgreSQL database backup file.'
						]
					},
					{
						p: '3.3. Service Fee Waiver on Cancellation: from the formal cancellation request onward, any charge for service fee, SLA, or NOXACLOUD management margin is 100% extinguished.'
					},
					{
						p: '3.4. Server Billing and Completion of Deactivation: the CLIENT remains solely and exclusively responsible for paying the pro-rated server consumption up to the moment of deactivation. The project will be closed and deactivated only after the residual infrastructure invoice is settled and all backups have been made available in the portal beforehand.'
					},
					{
						p: '3.5. Condition to Keep the Portal Account Active: to exercise the right to download backups and source code, the CLIENT undertakes to keep its Client Portal account active. Deleting the account before the download is complete will make it technically impossible and will revoke access to the files panel.'
					},
					{
						p: '3.6. Right to Resume and Reactivate: the CLIENT may request reactivation of its services and redeployment of its project at any time. Reactivation will be subject to the infrastructure costs and service fees in effect on the date of the new request, with no guarantee that prior commercial terms will be maintained.'
					}
				]
			}
		]
	}
];
