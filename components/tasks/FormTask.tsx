import { useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { startNewTask } from '../../reducers/tasksReducer';

const FormTask = () => {
  const dispatch = useAppDispatch();

	const [ titleForm, setTitleForm ] = useState<string>('');

	//* Input change
	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setTitleForm(target.value);
	};

	//* Add / Edit Task
	const addOrEdit = () => {
		dispatch( startNewTask(titleForm) );
		setTitleForm('');
	}

	return (
		<section className='form-task'>
			<h2 className='form-task__title'>Add Task</h2>

			<div className='form-task__form'>
				<input
					type='text'
					id='task-name'
					name='task'
					className='form-task__form--input'
					autoComplete='off'
					placeholder='Task Name'
					value={ titleForm }
					onChange={ handleInputChange }
				/>

				<button
					type='submit'
					className='form-task__form--button'
					disabled={ titleForm.trim().length < 3 ? true : false }
					onClick={ addOrEdit }
				>
					Add Task
				</button>
			</div>
		</section>
	);
}

export default FormTask;
