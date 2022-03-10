import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDoc, collection, db, deleteDoc, doc, updateDoc } from '../firebase/config';
import { RootState } from '../store/store';
import { loadProjects } from '../helpers/loadProjects';
import { openCloseForm } from './uiReducer';
import { ProjectInterface } from '../interfaces';

export type ProjectsState = {
	projects: ProjectInterface[];
	activeProject: ProjectInterface | null;
};

const initialState: ProjectsState = {
	projects: [],
	activeProject: null,
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProject: (state, action: PayloadAction<ProjectInterface>) => {
			state.projects = [ action.payload, ...state.projects ];
		},
		editProject: (state, action: PayloadAction<ProjectInterface>) => {
			state.projects = state.projects.map(project => project.id === action.payload.id ? action.payload : project);
			state.activeProject = state.activeProject?.id === action.payload.id ? action.payload : state.activeProject;
		},
		removeProject: (state, action: PayloadAction<string>) => {
			state.projects = state.projects.filter(project => project.id !== action.payload);
			state.activeProject = null;
		},
		setActiveProject: (state, action: PayloadAction<string>) => {
			state.activeProject = state.projects.find(project => project.id === action.payload) || null;
    },
		setProjects: (state, action: PayloadAction<ProjectInterface[]>) => {
			state.projects = action.payload;
		},
		cleanProjects: (state) => {
			state.projects = [];
			state.activeProject = null;
		}
	},
});

export const {
	addProject,
	editProject,
	removeProject,
	setActiveProject,
	setProjects,
	cleanProjects,
} = projectsSlice.actions;

//* Start creating new project
export const startNewProject = createAsyncThunk(
	'projects/startNewProject',
	async (title: string, { dispatch, getState }) => {
		const { auth: { uid } } = getState() as RootState;

		try {
			const userProjectsRef = await addDoc(
				collection(db, `${ uid }/mytasks/projects`),
				{ title }
			);

			const newProject: ProjectInterface = {
				id: userProjectsRef.id,
				title,
			};

			dispatch( addProject(newProject) );
			dispatch( setActiveProject(newProject.id) );
			dispatch( openCloseForm() );
		} catch (error) {
			console.log(error);
		}
	}
);

//* Start loading projects
export const startLoadingProjects = createAsyncThunk(
	'projects/startLoadingProjects',
	async (uid: string, { dispatch }) => {
		const projects = await loadProjects(uid);
		dispatch( setProjects(projects) );
	}
);

//* Start removing project
export const startRemovingProject = createAsyncThunk(
	'projects/startRemovingProject',
	async (id: string, { dispatch, getState }) => {
		const { auth: { uid } } = getState() as RootState;
		const documentRef = doc(db, `${ uid }/mytasks/projects/${ id }`);

		await deleteDoc(documentRef);
		dispatch( removeProject(id) );
	}
);

//* Start editing project
export const startEditingProject = createAsyncThunk(
	'projects/startEditingProject',
	async (project: ProjectInterface, { dispatch, getState }) => {
		const { auth: { uid } } = getState() as RootState;
		const { id, title } = project;
		const documentRef = doc(db, `${ uid }/mytasks/projects/${ id }`);

		await updateDoc(documentRef, { title });
		dispatch( editProject(project) );
	}
);

//* Selectors
export const getProjects = (state: RootState) => state.projects.projects;
export const getActiveProject = (state: RootState) => state.projects.activeProject;

export default projectsSlice.reducer;
