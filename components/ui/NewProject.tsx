import React from 'react';
import { FaPlus } from 'react-icons/fa';

import AlertError from './AlertError';

import validateNewProject from '../../validation/validateNewProject';
import { useForm } from '../../hooks/useForm';

import { ProjectInterface } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { addProject } from '../../reducers/projectsReducer';

const INITIAL_STATE = {
	title: '',
}

const NewProject = () => {
	const dispatch = useAppDispatch();

	const { values, errors, handleBlur, handleInputChange, onSubmit } = useForm(
		INITIAL_STATE,
		validateNewProject,
		create
	);
	const { title } = values;

	//* Create Project
	function create() {
		const newProject: ProjectInterface = {
			id: Math.random().toString(),
			title: title || '',
			tasks: [],
		}

		dispatch( addProject(newProject) );
	}

	return (
		<form	className='new-project' onSubmit={ onSubmit }>
			<input
				type='text'
				name='title'
				className='new-project__input'
				placeholder='Project Title'
				autoComplete='off'
				value={ title }
				onBlur={ handleBlur }
				onChange={ handleInputChange }
			/>

			{
				errors.title ? (
					<AlertError text={ errors.title } />
				) : (
					<button
						type='submit'
						className='new-project__button'
						disabled={ !title }
					>
						Create <FaPlus />
					</button>
				)
			}
		</form>
	);
}

export default NewProject;
