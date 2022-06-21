import { SequencerActionType } from '../actionTypes';
import { KitName } from '../models/kits';
import {
	UpdateCurrentKitAction,
	ToggleIsPlayingAction,
	SetTempoAction,
	DecrementTempoAction,
	IncrementTempoAction,
	ResetStepAction,
	IncrementStepAction,
} from '../actions/sequencer.actions';

export const updateCurrentKit = (kitName: KitName): UpdateCurrentKitAction => {
	return {
		type: SequencerActionType.UPDATE_CURRENT_KIT,
		payload: {
			kitName,
		},
	};
};

export const toggleIsPlaying = (isPlaying?: boolean): ToggleIsPlayingAction => {
	return {
		type: SequencerActionType.TOGGLE_IS_PLAYING,
		payload: {
			isPlaying,
		},
	};
};

export const setTempo = (tempo: number): SetTempoAction => {
	return {
		type: SequencerActionType.SET_TEMPO,
		payload: {
			tempo,
		},
	};
};

export const incrementTempo = (): IncrementTempoAction => {
	return {
		type: SequencerActionType.INCREMENT_TEMPO,
		payload: {},
	};
};

export const decrementTempo = (): DecrementTempoAction => {
	return {
		type: SequencerActionType.DECREMENT_TEMPO,
		payload: {},
	};
};

export const resetStep = (): ResetStepAction => {
	return {
		type: SequencerActionType.RESET_STEP,
		payload: {},
	};
};

export const incrementStep = (): IncrementStepAction => {
	return {
		type: SequencerActionType.INCREMENT_STEP,
		payload: {},
	};
};
