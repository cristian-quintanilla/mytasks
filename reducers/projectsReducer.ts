import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDoc, collection, db, deleteDoc, doc, updateDoc } from '../firebase/config';
import { AppDispatch, AppThunk, RootState } from '../store/store';
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
		cleanState: (state) => {
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
	cleanState,
} = projectsSlice.actions;

//* Start create new project
export const startNewProject = (title: string): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {
		const { uid } = getState().auth;

		try {
			const userProjectsColRef = await addDoc(
				collection(db, `${ uid }/mytasks/projects`),
				{ title }
			);

			const newProject: ProjectInterface = {
				id: userProjectsColRef.id,
				title,
			};

			dispatch( addProject(newProject) );
			dispatch( setActiveProject(newProject.id) );
			dispatch( openCloseForm() );
		} catch (error) {
			console.log(error);
		}
	}
}

//* Start loading projects
export const startLoadingProjects = (uid: string): AppThunk => {
	return async (dispatch: AppDispatch) => {
		const projects = await loadProjects(uid);
		dispatch( setProjects(projects) );
	}
}

//* Start removing project
export const startRemovingProject = (id: string): AppThunk => {
	return async (dispatch: AppDispatch, getState) => {
		const { uid } = getState().auth;
		const documentRef = doc(db, `${ uid }/mytasks/projects/${ id }`);

		await deleteDoc(documentRef);
		dispatch( removeProject(id) );
	}
}

//* Start editing project
export const startEditingProject = (project: ProjectInterface): AppThunk => {
	const { id, title } = project;

	return async (dispatch: AppDispatch, getState) => {
		const { uid } = getState().auth;
		const documentRef = doc(db, `${ uid }/mytasks/projects/${ id }`);

		await updateDoc(documentRef, { title });
		dispatch( editProject(project) );
	}
}

//* Selectors
export const getProjects = (state: RootState) => state.projects.projects;
export const getActiveProject = (state: RootState) => state.projects.activeProject;

export default projectsSlice.reducer;
