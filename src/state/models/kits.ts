export const KITS = ['rock', 'hip-hop', 'house', 'techno', 'dnb'] as const;

export type KitName = typeof KITS[number];

export type Kit = {
	name: KitName;
	baseUrl: string;
	samples: string[];
	defaultTempo: number;
};

const BASE_URL =
	'https://sequencer-test-samples.s3.us-east-2.amazonaws.com/originalKits';

export const allKits: Kit[] = [
	{
		name: 'rock',
		baseUrl: BASE_URL + '/rock',
		samples: [
			'KICK-1',
			'KICK-2',
			'SNARE-1',
			'HHAT-1',
			'HHAT-2',
			'TOM-1',
			'TOM-2',
			'RIDE',
			'CRASH',
			'TAMBORINE',
			'SHAKER',
		],
		defaultTempo: 100,
	},
	{
		name: 'hip-hop',
		baseUrl: BASE_URL + '/hip-hop',
		samples: [
			'KICK-1',
			'KICK-2',
			'SNARE-1',
			'HHAT-1',
			'HHAT-2',
			'CLAP-1',
			'PERC-1',
			'PERC-2',
			'PERC-3',
			'CYMBAL-1',
			'VOCAL-1',
		],
		defaultTempo: 90,
	},
	{
		name: 'house',
		baseUrl: BASE_URL + '/house',
		samples: [
			'KICK-1',
			'SNARE-1',
			'CLAP-1',
			'CLAP-2',
			'HHAT-1',
			'HHAT-2',
			'PERC-1',
			'PERC-2',
			'CYMBAL-1',
			'STAB-1',
			'TOM-1',
		],
		defaultTempo: 120,
	},
	{
		name: 'techno',
		baseUrl: BASE_URL + '/techno',
		samples: [
			'KICK-1',
			'KICK-2',
			'SNARE-1',
			'SNARE-2',
			'HHAT-1',
			'PERC-1',
			'PERC-2',
			'PERC-3',
			'PERC-4',
			'FX-1',
		],
		defaultTempo: 130,
	},
	{
		name: 'dnb',
		baseUrl: BASE_URL + '/dnb',
		samples: [
			'KICK-1',
			'SNARE-1',
			'SNARE-2',
			'HHAT-1',
			'HHAT-2',
			'PERC-1',
			'BASS-1',
			'BASS-2',
			'BASS-3',
			'FX-1',
			'FX-2',
		],
		defaultTempo: 170,
	},
];
