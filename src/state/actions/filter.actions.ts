import { FilterActionType } from '../actionTypes';

export interface UpdateFilterCutoffAction {
	type: FilterActionType.UPDATE_FILTER_CUTOFF;
	payload: {
		cutoff: number;
	};
}

export interface UpdateFilterResonanceAction {
	type: FilterActionType.UPDATE_FILTER_RESONANCE;
	payload: {
		resonance: number;
	};
}

export interface UpdateFilterTypeAction {
	type: FilterActionType.UPDATE_FILTER_TYPE;
	payload: {
		type: BiquadFilterType | null;
	};
}

export type FilterAction =
	| UpdateFilterCutoffAction
	| UpdateFilterResonanceAction
	| UpdateFilterTypeAction;
