export interface ContractDoc {
	id: string;
	name: string;
	meta: string;
	status: string;
	tipo: string;
}

export function initialContractDocs(): ContractDoc[] {
	return [
		{
			id: 'doc1',
			name: 'Contrato de prestação de serviço.pdf',
			meta: 'Assinado em 10/01/2026',
			status: 'Assinado digitalmente',
			tipo: 'Contrato'
		},
		{
			id: 'doc2',
			name: 'Termo de aceite digital.pdf',
			meta: 'Assinado em 10/01/2026',
			status: 'Assinado digitalmente',
			tipo: 'Termo'
		},
		{
			id: 'doc3',
			name: 'Escopo técnico do projeto.pdf',
			meta: 'Documento técnico',
			status: 'Vigente',
			tipo: 'Escopo técnico'
		}
	];
}
