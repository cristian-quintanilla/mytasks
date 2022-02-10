import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

export type NewProjectState = {
	open: boolean;
};

const initialState: NewProjectState = {
	open: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		open: state => {
			state.open = true;
		},
		close: state => {
			state.open = false;
		},
	},
});

export const { open, close } = uiSlice.actions;

export const selectOpen = (state: RootState) => state.ui.open;

export default uiSlice.reducer;
