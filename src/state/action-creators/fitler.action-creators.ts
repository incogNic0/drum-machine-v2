import {
	UpdateFilterCutoffAction,
	UpdateFilterResonanceAction,
	UpdateFilterTypeAction,
} from '../actions/filter.actions';
import { FilterActionType } from '../actionTypes';
import { setFilterCutoff, setFilterResonance } from '../../utils';
import { FilterNode } from '../models';
import { store } from '../store';

export const updateFilterCutoff = (
	cutoff: number,
	type: FilterNode
): UpdateFilterCutoffAction => {
	setFilterCutoff(type, cutoff);
	return {
		type: FilterActionType.UPDATE_FILTER_CUTOFF,
		payload: {
			cutoff,
		},
	};
};

export const updateFilterResonance = (
	resonance: number,
	type: FilterNode
): UpdateFilterResonanceAction => {
	setFilterResonance(type, resonance);
	return {
		type: FilterActionType.UPDATE_FILTER_RESONANCE,
		payload: {
			resonance,
		},
	};
};

export const updateFilterType = (
	type: BiquadFilterType | null
): UpdateFilterTypeAction => {
	const { cutoff, resonance } = store.getState().filter;
	if (type) {
		setFilterCutoff(type, cutoff);
		setFilterResonance(type, resonance);
	}
	return {
		type: FilterActionType.UPDATE_FILTER_TYPE,
		payload: {
			type,
		},
	};
};
