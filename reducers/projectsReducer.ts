import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';
import { ProjectInterface, TaskInterface } from '../interfaces';

export type ProjectsState = {
	projects: ProjectInterface[];
	activeProject: ProjectInterface | null;
};

const initialState: ProjectsState = {
	projects: [
		{
			id: 'project-1',
			title: 'Proyecto 1',
			tasks: []
		},
		{
			id: 'project-4',
			title: 'Proyecto 2',
			tasks: [
				{
					id: '1',
					title: 'Task 1',
					done: false,
				},
				{
					id: '2',
					title: 'Task 2',
					done: false,
				},
			]
		},
		{
			id: 'project-5',
			title: 'Proyecto 3',
			tasks: [
				{
					id: '1',
					title: 'Proyecto 3. Task 1',
					done: false,
				},
				{
					id: '2',
					title: 'Proyecto 3. Task 2',
					done: false,
				},
			]
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
		setActiveProject: (state, action: PayloadAction<string>) => {
      const activeProject = state.projects.find(project => project.id === action.payload);
			state.activeProject = activeProject ?? null;
    },
		removeProject: (state, action: PayloadAction<string>) => {
			state.projects = state.projects.filter(project => project.id !== action.payload);
			state.activeProject = null;
		}
	},
});

export const { addProject, setActiveProject, removeProject } = projectsSlice.actions;

export const getProjects = (state: RootState) => state.projects.projects;
export const getActiveProject = (state: RootState) => state.projects.activeProject;

export default projectsSlice.reducer;
