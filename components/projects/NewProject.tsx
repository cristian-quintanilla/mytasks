import { FaPlus } from 'react-icons/fa';

import AlertError from '../ui/AlertError';

import validateProject from '../../validation/validateProject';
import { useForm } from '../../hooks/useForm';

import { useAppDispatch } from '../../store/hooks';
import { startNewProject } from '../../reducers/projectsReducer';

const INITIAL_STATE = {
	title: '',
}

const NewProject = () => {
	const dispatch = useAppDispatch();

	const { values, errors, handleBlur, handleInputChange, onSubmit } = useForm(
		INITIAL_STATE,
		validateProject,
		create
	);
	const { title } = values;

	//* Create Project
	function create() {
		dispatch( startNewProject(title || '') );
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
