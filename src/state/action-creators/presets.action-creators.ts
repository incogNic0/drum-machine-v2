import {
	AddPresetAction,
	UpdatePresetAction,
	RemovePresetAction,
	LoadSavedPresetsAction,
	SetActivePresetAction,
} from '../actions/presets.actions';
import { KitName } from '../models/kits';
import { PresetPattern, PresetsData } from '../models/preset';
import { PresetsActionType } from '../actionTypes';
import { Dispatch } from 'react';
import { LoadSamplePatternAction } from '../actions';
import { store } from '../store';
import { loadSamplePattern } from './samples.action-creators';

export const loadPresets = (data: PresetsData): LoadSavedPresetsAction => {
	return {
		type: PresetsActionType.LOAD_SAVED_PRESETS,
		payload: {
			data,
		},
	};
};

export const addPreset = (
	name: string,
	kit: KitName,
	pattern: PresetPattern
): AddPresetAction => {
	return {
		type: PresetsActionType.ADD_PRESET,
		payload: {
			name,
			kit,
			pattern,
		},
	};
};

export const updatePreset = (
	name: string,
	kit: KitName,
	pattern: PresetPattern
): UpdatePresetAction => {
	return {
		type: PresetsActionType.UPDATE_PRESET,
		payload: {
			name,
			kit,
			pattern,
		},
	};
};

export const removePreset = (
	name: string,
	kit: KitName
): RemovePresetAction => {
	return {
		type: PresetsActionType.REMOVE_PRESET,
		payload: {
			name,
			kit,
		},
	};
};

export const setActivePreset = (name: string | null): SetActivePresetAction => {
	return {
		type: PresetsActionType.SET_ACTIVE_PRESET,
		payload: {
			name,
		},
	};
};

export const loadSelectedPreset = (name: string, kit: KitName) => {
	return (
		dispatch: Dispatch<LoadSamplePatternAction>,
		getState: typeof store.getState
	) => {
		const presets = getState().presets;
		const foundPreset = presets.data[kit].find(
			(preset) => preset.name === name
		);
		if (foundPreset) {
			for (const sampleName in foundPreset.pattern) {
				const steps = foundPreset.pattern[sampleName];
				dispatch(loadSamplePattern(sampleName, steps));
			}
		}
	};
};
