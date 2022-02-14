import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDoc, collection, db, deleteDoc, doc, updateDoc } from '../firebase/config';
import { AppDispatch, AppThunk, RootState } from '../store/store';
import { TaskInterface } from '../interfaces';

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
		setActualTask: (state, action: PayloadAction<TaskInterface>) => {
			state.activeTask = action.payload;
		},
		cleanActualTask: (state) => {
			state.activeTask = null;
		},
		setTasks: (state, action: PayloadAction<TaskInterface>) => {
			state.tasks = [ action.payload,  ...state.tasks ];
		},
		setTasksProject: (state, action: PayloadAction<TaskInterface[]>) => {
			state.tasks = action.payload;
		},
	},
});

export const { setTasks, setTasksProject, cleanActualTask } = tasksSlice.actions;

//* TODO: Start loading tasks for project
export const getTasks = (id: string): AppThunk => async (dispatch: AppDispatch) => {
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
			done: true,
			project: id,
		},
	];

	dispatch(setTasksProject(tasks));
};

//* Start creating new tasks
export const startNewTask = (title: string): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {
		const { id } = getState().projects.activeProject || {};
		const { uid } = getState().auth;

		try {
			const userTasksRef = await addDoc(
				collection(db, `${ uid }/mytasks/tasks`),
				{
					title,
					done: false,
					project: id,
				}
			);

			const newTask: TaskInterface = {
				id: userTasksRef.id,
				title,
				done: false,
				project: id || '',
			};

			dispatch( setTasks(newTask) );
			dispatch( cleanActualTask() );
		} catch (error) {
			console.log(error);
		}
	}
}


export const getTasksProject = (state: RootState) => state.tasks.tasks;

export default tasksSlice.reducer;
