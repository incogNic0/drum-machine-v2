import { SamplesActionType } from '../actionTypes';

export interface UpdateSamplesBaseUrlAction {
	type: SamplesActionType.UPDATE_SAMPLES_BASE_URL;
	payload: {
		baseUrl: string;
	};
}

export interface LoadSampleAction {
	type: SamplesActionType.LOAD_SAMPLE;
	payload: {
		name: string;
	};
}

export interface ToggleSampleStepAction {
	type: SamplesActionType.TOGGLE_SAMPLE_STEP;
	payload: {
		name: string;
		step: number;
	};
}

export interface ClearSamplesAction {
	type: SamplesActionType.CLEAR_SAMPLES;
	payload: {};
}

export interface ResetSamplesStepsAction {
	type: SamplesActionType.RESET_SAMPLES_STEPS;
	payload: {};
}

export interface LoadSamplePatternAction {
	type: SamplesActionType.LOAD_SAMPLE_PATTERN;
	payload: {
		name: string;
		steps: boolean[];
	};
}

export interface ToggleMuteSampleAction {
	type: SamplesActionType.TOGGLE_MUTE_SAMPLE;
	payload: {
		name: string;
		mute?: boolean;
	};
}

export type SamplesAction =
	| LoadSampleAction
	| ClearSamplesAction
	| ToggleSampleStepAction
	| ToggleMuteSampleAction
	| ResetSamplesStepsAction
	| LoadSamplePatternAction
	| UpdateSamplesBaseUrlAction;
