import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDoc, collection, db, deleteDoc, doc, updateDoc } from '../firebase/config';
import { AppDispatch, AppThunk, RootState } from '../store/store';
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
		setActiveTask: (state, action: PayloadAction<TaskInterface>) => {
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
export const getTasks = (id: string): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {
		const { uid } = getState().auth;

		const tasks = await loadTasks(uid, id);
		dispatch( setTasksProject(tasks) );
	};
}

//* Start creating new task
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

//* Start editing task
export const startEditingTask = (task: TaskInterface): AppThunk => {
	const { id, done, title } = task;

	return async (dispatch: AppDispatch, getState) => {
		const { uid } = getState().auth;
		const documentRef = doc(db, `${ uid }/mytasks/tasks/${ id }`);

		await updateDoc(documentRef, { done, title });
		dispatch( editTask(task) );
	}
}

//* Start removing task
export const startRemovingTask = (id: string): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {
		const { uid } = getState().auth;
		const documentRef = doc(db, `${ uid }/mytasks/tasks/${ id }`);

		await deleteDoc(documentRef);
		dispatch( removeTask(id) );
	}
}

//* Selectors
export const getTasksProject = (state: RootState) => state.tasks.tasks;
export const getActiveTask = (state: RootState) => state.tasks.activeTask;

export default tasksSlice.reducer;
