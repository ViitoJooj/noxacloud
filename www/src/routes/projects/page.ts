export type ServerStatus = 'online' | 'paused' | 'stopped';
export type ServerProvider = 'aws' | 'azure' | 'oracle';

export interface Server {
	id: string;
	name: string;
	desc: string;
	projectName: string;
	status: ServerStatus;
	provider: ServerProvider;
	cpu: string;
	mem: string;
	disk: string;
	ip: string;
	region: string;
	createdAt: string;
	updatedAt: string;
	backupOn: boolean;
	backupHour: string;
}

export function initialServers(): Server[] {
	return [
		{
			id: 'srv1',
			name: 'App do Restaurante Sabor Caseiro',
			desc: 'Frontend + Backend (SvelteKit/Golang)',
			projectName: 'Restaurante Sabor Caseiro',
			status: 'online',
			provider: 'aws',
			cpu: '42%',
			mem: '61%',
			disk: '12 GB / 40 GB',
			ip: '54.94.201.18',
			region: 'sa-east-1 (São Paulo)',
			createdAt: '10/01/2026',
			updatedAt: '11/09/2026 08:32',
			backupOn: true,
			backupHour: '03:00'
		},
		{
			id: 'srv2',
			name: 'Banco de dados do Restaurante Sabor Caseiro',
			desc: 'PostgreSQL dedicado',
			projectName: 'Restaurante Sabor Caseiro',
			status: 'online',
			provider: 'aws',
			cpu: '18%',
			mem: '34%',
			disk: '3 GB / 20 GB',
			ip: '54.94.201.19',
			region: 'sa-east-1 (São Paulo)',
			createdAt: '10/01/2026',
			updatedAt: '11/09/2026 08:32',
			backupOn: true,
			backupHour: '03:00'
		},
		{
			id: 'srv3',
			name: 'App da Barbearia Estilo',
			desc: 'Frontend + Backend (SvelteKit/Golang)',
			projectName: 'Barbearia Estilo',
			status: 'paused',
			provider: 'azure',
			cpu: '0%',
			mem: '4%',
			disk: '5 GB / 40 GB',
			ip: '20.206.44.87',
			region: 'Brazil South',
			createdAt: '22/03/2026',
			updatedAt: '05/09/2026 22:10',
			backupOn: false,
			backupHour: '00:00'
		}
	];
}

const STATUS_TAG_VARIANT: Record<ServerStatus, 'accent' | 'neutral' | 'outline'> = {
	online: 'accent',
	paused: 'outline',
	stopped: 'neutral'
};

export function statusTagVariant(status: ServerStatus): 'accent' | 'neutral' | 'outline' {
	return STATUS_TAG_VARIANT[status];
}

export const PROVIDER_OPTIONS: { value: ServerProvider; label: string }[] = [
	{ value: 'aws', label: 'AWS' },
	{ value: 'azure', label: 'Azure' },
	{ value: 'oracle', label: 'Oracle' }
];
