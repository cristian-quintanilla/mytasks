import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDoc, collection, db, doc } from '../firebase/config';
import { AppDispatch, AppThunk, RootState } from '../store/store';
import { openCloseForm } from './uiReducer';
import { ProjectInterface } from '../interfaces';

export type ProjectsState = {
	projects: ProjectInterface[];
	activeProject: ProjectInterface | null;
};

const initialState: ProjectsState = {
	projects: [
		{
			id: 'project-1',
			title: 'Proyecto 1',
		},
		{
			id: 'project-4',
			title: 'Proyecto 2',
		},
		{
			id: 'project-5',
			title: 'Proyecto 3',
		},
	],
	activeProject: null,
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProject: (state, action: PayloadAction<ProjectInterface>) => {
			state.projects = [ action.payload, ...state.projects ];
		},
		removeProject: (state, action: PayloadAction<string>) => {
			state.projects = state.projects.filter(project => project.id !== action.payload);
			state.activeProject = null;
		},
		setActiveProject: (state, action: PayloadAction<string>) => {
			state.activeProject = state.projects.find(project => project.id === action.payload) || null;
    },
		editProject: (state, action: PayloadAction<ProjectInterface>) => {
			state.projects = state.projects.map(project => project.id === action.payload.id ? action.payload : project);
			state.activeProject = state.activeProject?.id === action.payload.id ? action.payload : state.activeProject;
		}
	},
});

export const {
	addProject,
	editProject,
	removeProject,
	setActiveProject
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

//* Selectors
export const getProjects = (state: RootState) => state.projects.projects;
export const getActiveProject = (state: RootState) => state.projects.activeProject;

export default projectsSlice.reducer;
