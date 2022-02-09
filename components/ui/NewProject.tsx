import React from 'react';
import { FaPlus } from 'react-icons/fa';

import { useForm } from '../../hooks/useForm';

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

	return (
		<form
			className='new-project'
			// onSubmit={ createProject }
		>
			<input
				type='text'
				name='title'
				className='new-project__input'
				placeholder='Project Title'
				autoComplete='off'
				// value={ title }
				// onChange={ handleInputChange }
			/>

			<button
				type='submit'
				className='new-project__button'
			>
				Create <FaPlus />
			</button>
		</form>
	);
}

export default NewProject;
