import { KitName } from './kits';

export interface PresetPattern {
	[key: string]: boolean[];
}

export interface Preset {
	name: string;
	kit: KitName;
	pattern: PresetPattern;
}

export type PresetsData = {
	[key in KitName]: Preset[];
};
