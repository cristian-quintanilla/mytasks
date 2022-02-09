import React from 'react';
import { FaPlus } from 'react-icons/fa';

const NewProject = () => {
	const [ projectTitle, setProjectTitle ] = React.useState<string>('');

	//* Create Project
	const createProject = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log('Create Project', projectTitle);
	}

	return (
		<form
			className='new-project'
			onSubmit={ createProject }
		>
			<input
				type='text'
				name='newProject'
				className='new-project__input'
				placeholder='Project Title'
				autoComplete='off'
				onChange={ (event) => setProjectTitle(event.target.value) }
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
