import produce from 'immer';
import { SamplesActionType } from '../actionTypes';
import { SamplesAction } from '../actions/samples.actions';
import { Sample } from '../models/sample';

export interface SamplesState {
	order: string[];
	baseUrl: string;
	data: {
		[key: string]: Sample;
	};
}

const intialSamplesState = {
	order: [],
	baseUrl: '',
	data: {},
};

const reducer = produce(
	(
		state: SamplesState = intialSamplesState,
		action: SamplesAction
	): SamplesState => {
		switch (action.type) {
			case SamplesActionType.UPDATE_SAMPLES_BASE_URL:
				state.baseUrl = action.payload.baseUrl;
				return state;

			case SamplesActionType.LOAD_SAMPLE: {
				const { name } = action.payload;
				const newSample: Sample = {
					name,
					path: `${state.baseUrl}/${name.toLowerCase()}.wav`,
					steps: Array(16).fill(false),
					mute: false,
				};
				state.data[name] = newSample;
				state.order.push(name);
				return state;
			}

			case SamplesActionType.TOGGLE_SAMPLE_STEP: {
				const { name, step } = action.payload;
				const prevState = state.data[name].steps[step];
				state.data[name].steps[step] = !prevState;
				return state;
			}

			case SamplesActionType.CLEAR_SAMPLES: {
				state.order = [];
				state.data = {};
				return state;
			}

			case SamplesActionType.RESET_SAMPLES_STEPS: {
				for (const sampleName in state.data) {
					state.data[sampleName].steps = Array(16).fill(false);
				}
				return state;
			}

			case SamplesActionType.LOAD_SAMPLE_PATTERN: {
				const { name, steps } = action.payload;
				state.data[name].steps = steps;
				return state;
			}

			case SamplesActionType.TOGGLE_MUTE_SAMPLE: {
				const { name, mute } = action.payload;
				state.data[name].mute =
					mute !== undefined ? mute : !state.data[name].mute;
				return state;
			}

			default:
				return state;
		}
	},
	intialSamplesState
);

export default reducer;
