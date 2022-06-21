import { combineReducers } from 'redux';
import filterReducer from './filter.reducer';
import presetsReducer from './presets.reducer';
import samplesReducer from './samples.reducer';
import sequencerReducer from './sequencer.reducer';

const reducers = combineReducers({
	sequencer: sequencerReducer,
	samples: samplesReducer,
	presets: presetsReducer,
	filter: filterReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
