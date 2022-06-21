import produce from 'immer';
import { KITS } from '../models/kits';
import { PresetsData } from '../models/preset';
import { PresetsActionType } from '../actionTypes';
import { PresetAction } from '../actions/presets.actions';

type PresetsState = {
	active: string | null;
	data: PresetsData;
};

const initialPresetsState: PresetsState = {
	active: null,
	data: KITS.reduce((dataObj, kit) => {
		dataObj[kit] = [];
		return dataObj;
	}, {} as PresetsData),
};

const reducer = produce(
	(
		state: PresetsState = initialPresetsState,
		action: PresetAction
	): PresetsState => {
		switch (action.type) {
			case PresetsActionType.LOAD_SAVED_PRESETS: {
				state.data = action.payload.data;
				return state;
			}

			case PresetsActionType.ADD_PRESET: {
				const { kit } = action.payload;
				state.data[kit].push(action.payload);
				return state;
			}

			case PresetsActionType.UPDATE_PRESET: {
				const { kit, name } = action.payload;
				const index = state.data[kit].findIndex(
					(preset) => preset.name === name
				);
				if (index >= 0) {
					state.data[kit][index] = action.payload;
				}
				return state;
			}

			case PresetsActionType.REMOVE_PRESET: {
				const { name, kit } = action.payload;
				state.data[kit] = state.data[kit]?.filter((preset) => {
					return preset.name !== name;
				});
				return state;
			}

			case PresetsActionType.SET_ACTIVE_PRESET: {
				state.active = action.payload.name;
				return state;
			}

			default:
				return state;
		}
	},
	initialPresetsState
);

export default reducer;
