import { useState } from 'react';

import AlertError from '../ui/AlertError';

import validateTask from '../../validation/validateTask';
import { useForm } from '../../hooks/useForm';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addTask, getActiveProject } from '../../reducers/projectsReducer';

const AddEditTask = () => {
	const dispatch = useAppDispatch();
	const project = useAppSelector(getActiveProject);

	const [ titleForm, setTitleForm ] = useState<string>('');

	//* Input change
	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setTitleForm(target.value);
	};

	//* Add / Edit Task
	const addOrEdit = () => {
		const payload = {
			projectID: project?.id,
			id: Math.random().toString(),
			title: titleForm.trim() || '',
			done: false
		}

		dispatch( addTask(payload) );
	}

	return (
		<section className='form-task'>
			<h2 className='form-task__title'>Add Task</h2>

			<div className='form-task__form'>
				<input
					type='text'
					id='task-name'
					name='task'
					className='form-task__form-input'
					autoComplete='off'
					placeholder='Task Name'
					value={ titleForm }
					onChange={ handleInputChange }
				/>

				<button
					type='submit'
					className='form-task__form-button'
					disabled={ titleForm.trim().length < 3 ? true : false }
					onClick={ addOrEdit }
				>
					Add Task
				</button>
			</div>
		</section>
	);
}

export default AddEditTask;
