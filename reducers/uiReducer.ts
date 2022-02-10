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
		openCloseForm: state => {
			state.open = !state.open;
		},
	},
});

export const { openCloseForm } = uiSlice.actions;

export const selectNewProject = (state: RootState) => state.ui.open;

export default uiSlice.reducer;
