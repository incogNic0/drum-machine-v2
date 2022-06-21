import { SequencerActionType } from '../actionTypes';
import { KitName } from '../models/kits';

export interface UpdateCurrentKitAction {
	type: SequencerActionType.UPDATE_CURRENT_KIT;
	payload: {
		kitName: KitName;
	};
}

export interface ToggleIsPlayingAction {
	type: SequencerActionType.TOGGLE_IS_PLAYING;
	payload: {
		isPlaying?: boolean;
	};
}

export interface SetTempoAction {
	type: SequencerActionType.SET_TEMPO;
	payload: {
		tempo: number;
	};
}

export interface IncrementTempoAction {
	type: SequencerActionType.INCREMENT_TEMPO;
	payload: {};
}

export interface DecrementTempoAction {
	type: SequencerActionType.DECREMENT_TEMPO;
	payload: {};
}

export interface ResetStepAction {
	type: SequencerActionType.RESET_STEP;
	payload: {};
}

export interface IncrementStepAction {
	type: SequencerActionType.INCREMENT_STEP;
	payload: {};
}

export type SequencerAction =
	| UpdateCurrentKitAction
	| ToggleIsPlayingAction
	| SetTempoAction
	| IncrementTempoAction
	| DecrementTempoAction
	| ResetStepAction
	| IncrementStepAction;
