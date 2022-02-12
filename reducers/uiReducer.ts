import { createSlice } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';

export type NewProjectState = {
	open: boolean;
	loading: boolean;
};

const initialState: NewProjectState = {
	open: false,
	loading: false,
};

export const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openCloseForm: state => {
			state.open = !state.open;
		},
		startLoading: state => {
			state.loading = true;
		},
		stopLoading: state => {
			state.loading = false;
		}
	},
});

export const { openCloseForm, startLoading, stopLoading } = uiSlice.actions;

export const selectNewProject = (state: RootState) => state.ui.open;
export const getLoading = (state: RootState) => state.ui.loading;

export default uiSlice.reducer;
