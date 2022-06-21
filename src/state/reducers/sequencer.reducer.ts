import produce from 'immer';
import { SequencerAction } from '../actions';
import { SequencerActionType } from '../actionTypes';
import { KITS, KitName } from '../models/kits';

export interface SequencerState {
	loading: boolean;
	kits: typeof KITS;
	isPlaying: boolean;
	currentKit: KitName;
	tempo: number;
	step: number;
}

const initialSequencerState: SequencerState = {
	loading: false,
	kits: KITS,
	currentKit: KITS[0],
	isPlaying: false,
	tempo: 100,
	step: -1,
};

const reducer = produce(
	(
		state: SequencerState = initialSequencerState,
		action: SequencerAction
	): SequencerState => {
		switch (action.type) {
			case SequencerActionType.TOGGLE_IS_PLAYING:
				const { isPlaying } = action.payload;
				state.isPlaying =
					typeof isPlaying === 'boolean' ? isPlaying : !state.isPlaying;
				return state;

			case SequencerActionType.UPDATE_CURRENT_KIT:
				state.currentKit = action.payload.kitName;
				return state;

			case SequencerActionType.SET_TEMPO: {
				let { tempo } = action.payload;
				if (tempo < 60) tempo = 60;
				if (tempo > 200) tempo = 200;
				state.tempo = tempo;
				return state;
			}

			case SequencerActionType.INCREMENT_TEMPO:
				state.tempo = Math.min(state.tempo + 1, 200);
				return state;

			case SequencerActionType.DECREMENT_TEMPO:
				state.tempo = Math.max(state.tempo - 1, 60);
				return state;

			case SequencerActionType.RESET_STEP:
				state.step = -1;
				return state;

			case SequencerActionType.INCREMENT_STEP:
				const nextStep = state.step + 1;
				state.step = nextStep > 15 ? 0 : nextStep;
				return state;

			default:
				return state;
		}
	},
	initialSequencerState
);

export default reducer;
