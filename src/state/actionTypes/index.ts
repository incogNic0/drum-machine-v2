export enum SequencerActionType {
	TOGGLE_IS_PLAYING = 'toggle_is_playing',
	UPDATE_CURRENT_KIT = 'update_current_kit',
	SET_TEMPO = 'set_tempo',
	INCREMENT_TEMPO = 'increment_tempo',
	DECREMENT_TEMPO = 'decrement_tempo',
	RESET_STEP = 'reset_step',
	INCREMENT_STEP = 'increment_step',
}

export enum SamplesActionType {
	LOAD_SAMPLE = 'load_sample',
	LOAD_SAMPLE_PATTERN = 'load_sample_pattern',
	TOGGLE_SAMPLE_STEP = 'toggle_sample_step',
	CLEAR_SAMPLES = 'clear_samples',
	RESET_SAMPLES_STEPS = 'reset_sample_steps',
	UPDATE_SAMPLES_BASE_URL = 'update_samples_base_url',
	TOGGLE_MUTE_SAMPLE = 'toggle_mute_sample',
	SET_SAMPLE_GAIN = 'set_sample_gain',
}

export enum PresetsActionType {
	LOAD_SELECTED_PRESET = 'load_selected_preset',
	LOAD_SAVED_PRESETS = 'load_saved_presets',
	ADD_PRESET = 'add_preset',
	UPDATE_PRESET = 'update_preset',
	REMOVE_PRESET = 'remove_preset',
	SET_ACTIVE_PRESET = 'set_active_preset',
}

export enum FilterActionType {
	UPDATE_FILTER_CUTOFF = 'update_filter_cutoff',
	UPDATE_FILTER_RESONANCE = 'update_filter_resonance',
	UPDATE_FILTER_TYPE = 'update_filter_type',
}
