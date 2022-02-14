import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDoc, collection, db } from '../firebase/config';
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
		}
	},
});

export const {
	addProject,
	editProject,
	removeProject,
	setActiveProject,
	setProjects,
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

//* Selectors
export const getProjects = (state: RootState) => state.projects.projects;
export const getActiveProject = (state: RootState) => state.projects.activeProject;

export default projectsSlice.reducer;
