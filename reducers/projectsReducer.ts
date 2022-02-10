import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store/store';
import { ProjectInterface } from '../interfaces';

export type ProjectsState = {
	projects: ProjectInterface[];
	activeProject: ProjectInterface | null;
};

const initialState: ProjectsState = {
	projects: [
		{
			id: 'project-1',
			title: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
			tasks: []
		},
		{
			id: 'project-2',
			title: 'Project 2',
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
			id: 'project-3',
			title: 'Project 3',
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
			id: 'project-4',
			title: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
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
			title: 'Project 2',
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
	],
	activeProject: null,
};

export const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setActiveProject: (state, action: PayloadAction<ProjectInterface>) => {
      state.activeProject = action.payload;
    },
	},
});

export const { setActiveProject } = projectsSlice.actions;

export const getProjects = (state: RootState) => state.projects.projects;
export const getActiveProject = (state: RootState) => state.projects.activeProject;

export default projectsSlice.reducer;
