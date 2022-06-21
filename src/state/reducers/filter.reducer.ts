import produce from 'immer';
import { Filter } from '../models';
import { FilterActionType } from '../actionTypes';
import { FilterAction } from '../actions';

const initialFilterState: Filter = {
	cutoff: 0,
	resonance: 0,
	type: null,
	filterNode: null,
};

const reducer = produce(
	(state: Filter = initialFilterState, action: FilterAction): Filter => {
		switch (action.type) {
			case FilterActionType.UPDATE_FILTER_TYPE:
				state.type = action.payload.type;
				return state;

			case FilterActionType.UPDATE_FILTER_CUTOFF:
				state.cutoff = action.payload.cutoff;
				return state;

			case FilterActionType.UPDATE_FILTER_RESONANCE:
				state.resonance = action.payload.resonance;
				return state;

			default:
				return state;
		}
	},
	initialFilterState
);

export default reducer;
