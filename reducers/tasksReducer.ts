import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDoc, auth, collection, db, deleteDoc, doc, updateDoc } from '../firebase/config';
import { RootState } from '../store/store';
import { TaskInterface } from '../interfaces';
import { loadTasks } from '../helpers/loadTasks';

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
		setActiveTask: (state, action: PayloadAction<TaskInterface | null>) => {
			state.activeTask = action.payload;
		},
		cleanActualTask: (state) => {
			state.activeTask = null;
		},
		editTask: (state, action: PayloadAction<TaskInterface>) => {
			state.tasks = state.tasks.map(task => task.id === action.payload.id ? action.payload : task);
		},
		removeTask: (state, action: PayloadAction<string>) => {
			state.tasks = state.tasks.filter(task => task.id !== action.payload);
		},
		setTasks: (state, action: PayloadAction<TaskInterface>) => {
			state.tasks = [ action.payload,  ...state.tasks ];
		},
		setTasksProject: (state, action: PayloadAction<TaskInterface[]>) => {
			state.tasks = action.payload;
		},
		cleanTasks: (state) => {
			state.tasks = [];
			state.activeTask = null;
		}
	},
});

export const {
	setActiveTask,
	cleanActualTask,
	editTask,
	removeTask,
	setTasks,
	setTasksProject,
	cleanTasks
} = tasksSlice.actions;

//* Start loading tasks for project
export const getTasks = createAsyncThunk(
	'tasks/getTasks',
	async (id: string, { dispatch, getState }) => {
		const { auth: { uid } } = getState() as RootState;

		const tasks = await loadTasks(uid, id);
		dispatch( setTasksProject(tasks) );
	}
);

//* Start creating new task
export const startNewTask = createAsyncThunk(
	'tasks/startNewTask',
	async (title: string, { dispatch, getState }) => {
		const { projects: { activeProject }, auth } = getState() as RootState;

		const { id } = activeProject || {};
		const { uid } = auth;

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
);

//* Start editing task
export const startEditingTask = createAsyncThunk(
	'tasks/startEditingTask',
	async (task: TaskInterface, { dispatch, getState }) => {
		const { id, done, title } = task;
		const { auth: { uid } } = getState() as RootState;

		const documentRef = doc(db, `${ uid }/mytasks/tasks/${ id }`);
		await updateDoc(documentRef, { done, title });

		dispatch( editTask(task) );
	}
);

//* Start removing task
export const startRemovingTask = createAsyncThunk(
	'tasks/startRemovingTask',
	async (id: string, { dispatch, getState }) => {
		const { auth: { uid } } = getState() as RootState;

		const documentRef = doc(db, `${ uid }/mytasks/tasks/${ id }`);
		await deleteDoc(documentRef);

		dispatch( removeTask(id) );
	}
);

//* Selectors
export const getTasksProject = (state: RootState) => state.tasks.tasks;
export const getActiveTask = (state: RootState) => state.tasks.activeTask;

export default tasksSlice.reducer;
