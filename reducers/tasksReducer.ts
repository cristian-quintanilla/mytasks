import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TaskInterface } from '../interfaces';
import { AppDispatch, AppThunk, RootState } from '../store/store';

export type TasksState = {
	tasks: TaskInterface[];
	activeTask: TaskInterface | null;
};

const initialState: TasksState = {
	tasks: [],
	activeTask: null,
};

export const tasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks: (state, action: PayloadAction<TaskInterface[]>) => {
			state.tasks = action.payload;
		}
	},
});

export const getTasks = (id: string): AppThunk => async (dispatch: AppDispatch) => {
	// TODO: fetch tasks from firebase
	const tasks: TaskInterface[] = [
		{
			id: 'task-1',
			title: 'Tarea 1',
			done: false,
			project: id,
		},
		{
			id: 'task-2',
			title: 'Tarea 2  XD',
			done: false,
			project: id,
		},
	];

	dispatch(tasksSlice.actions.setTasks(tasks));
};

export const getTasksProject = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer;
