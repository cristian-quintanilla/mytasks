import { useState, useEffect } from 'react';

import {
	cleanActualTask,
	getActiveTask,
	startEditingTask,
	startNewTask
} from '../../reducers/tasksReducer';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { TaskInterface } from '../../interfaces';

const FormTask = () => {
  const dispatch = useAppDispatch();
	const activeTask = useAppSelector(getActiveTask);

	const [ titleForm, setTitleForm ] = useState<string>('');

	//* Set title form value when active task changes
	useEffect(() => {
		if (activeTask) {
			setTitleForm(activeTask.title);
		}
	}, [activeTask]);

	//* Input change
	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setTitleForm(target.value);
	};

	//* Add / Edit Task
	const addOrEdit = () => {
		if (activeTask) {
			const taskEdit: TaskInterface = {
				...activeTask,
				title: titleForm
			}

			dispatch( startEditingTask(taskEdit) );
			dispatch( cleanActualTask() );
		} else {
			dispatch( startNewTask(titleForm) );
		}

		setTitleForm('');
	}

	return (
		<section className='form-task'>
			<h2 className='form-task__title'>
				{
					activeTask ? 'Edit Task' : 'Add Task'
				}
			</h2>

			<div className='form-task__form'>
				<input
					type='text'
					id='task-name'
					name='task'
					className='form-task__form--input'
					autoComplete='off'
					placeholder='Task Title'
					value={ titleForm }
					onChange={ handleInputChange }
				/>

				<button
					type='submit'
					className='form-task__form--button'
					disabled={ titleForm.trim().length < 3 ? true : false }
					onClick={ addOrEdit }
				>
					{
						activeTask ? 'Edit Task' : 'Add Task'
					}
				</button>
			</div>
		</section>
	);
}

export default FormTask;
