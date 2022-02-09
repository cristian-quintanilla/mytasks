import React from 'react';
import { FaPlus } from 'react-icons/fa';

import validateNewProject from '../../validation/validateNewProject';
import { useForm } from '../../hooks/useForm';
import AlertError from './AlertError';

const INITIAL_STATE = {
	title: '',
}

const NewProject = () => {
	// const { formulario, handleInputChange, reset } = useForm({
	// 	title: '',
	// });

	// const { title } = formulario;

	// //* Create Project
	// const createProject = (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault();

	// 	console.log(title);
	// 	reset();
	// }

	const {
		values,
		errors,
		handleBlur,
		handleInputChange,
		onSubmit
	} = useForm(INITIAL_STATE, validateNewProject, create);

	const { title } = values;

	//* Register
	async function create() {
		console.log('Creating project...');
		console.log(title);
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
