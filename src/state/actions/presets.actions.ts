import { KitName } from '../models/kits';
import { PresetPattern, PresetsData } from '../models/preset';
import { PresetsActionType } from '../actionTypes';

export interface LoadSavedPresetsAction {
	type: PresetsActionType.LOAD_SAVED_PRESETS;
	payload: {
		data: PresetsData;
	};
}

export interface AddPresetAction {
	type: PresetsActionType.ADD_PRESET;
	payload: {
		name: string;
		kit: KitName;
		pattern: PresetPattern;
	};
}

export interface UpdatePresetAction {
	type: PresetsActionType.UPDATE_PRESET;
	payload: {
		name: string;
		kit: KitName;
		pattern: PresetPattern;
	};
}

export interface RemovePresetAction {
	type: PresetsActionType.REMOVE_PRESET;
	payload: {
		name: string;
		kit: KitName;
	};
}

export interface SetActivePresetAction {
	type: PresetsActionType.SET_ACTIVE_PRESET;
	payload: {
		name: string | null;
	};
}

export type PresetAction =
	| LoadSavedPresetsAction
	| AddPresetAction
	| UpdatePresetAction
	| RemovePresetAction
	| SetActivePresetAction;
