import { SamplesActionType } from '../actionTypes';
import {
	LoadSampleAction,
	ClearSamplesAction,
	ToggleSampleStepAction,
	ToggleMuteSampleAction,
	ResetSamplesStepsAction,
	LoadSamplePatternAction,
	UpdateSamplesBaseUrlAction,
} from '../actions/samples.actions';

export const updateSamplesBaseUrl = (
	baseUrl: string
): UpdateSamplesBaseUrlAction => {
	return {
		type: SamplesActionType.UPDATE_SAMPLES_BASE_URL,
		payload: {
			baseUrl,
		},
	};
};

export const loadSample = (name: string): LoadSampleAction => {
	return {
		type: SamplesActionType.LOAD_SAMPLE,
		payload: {
			name,
		},
	};
};

export const toggleSampleStep = (
	name: string,
	step: number
): ToggleSampleStepAction => {
	return {
		type: SamplesActionType.TOGGLE_SAMPLE_STEP,
		payload: {
			name,
			step,
		},
	};
};

export const clearSamples = (): ClearSamplesAction => {
	return {
		type: SamplesActionType.CLEAR_SAMPLES,
		payload: {},
	};
};

export const resetSamplesSteps = (): ResetSamplesStepsAction => {
	return {
		type: SamplesActionType.RESET_SAMPLES_STEPS,
		payload: {},
	};
};

export const loadSamplePattern = (
	name: string,
	steps: boolean[]
): LoadSamplePatternAction => {
	return {
		type: SamplesActionType.LOAD_SAMPLE_PATTERN,
		payload: {
			name,
			steps,
		},
	};
};

export const toggleMuteSample = (
	name: string,
	mute?: boolean
): ToggleMuteSampleAction => {
	return {
		type: SamplesActionType.TOGGLE_MUTE_SAMPLE,
		payload: {
			name,
			mute,
		},
	};
};
