import { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import Task from '../tasks/Task';

import { ProjectInterface } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editProject, removeProject } from '../../reducers/projectsReducer';
import { getTasksProject } from '../../reducers/tasksReducer';

const TasksList = (project: ProjectInterface) => {
	const dispatch = useAppDispatch();
	const tasks = useAppSelector(getTasksProject);

	const [ titleForm, setTitleForm ] = useState<string>(project.title);

	//* Change the title of the project
	useEffect(() => {
		setTitleForm(project.title);
	}, [project.title]);

	//* Input change
	const handleInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setTitleForm(target.value);
	};

	//* Remove project
	function remove() {
		dispatch( removeProject(project.id) );
	}

	//* Edit Project
	function edit() {
		const editProjectData: ProjectInterface = { ...project, title: titleForm };
		dispatch( editProject(editProjectData) );
	}

	return (
		<section className='tasks'>
			<h2 className='tasks__title'>Project: { project.title }</h2>

			{
				tasks.length === 0 ? (
					<p className='tasks__no-tasks'>No tasks. Start creating one.</p>
				) : (
					tasks.map(task => (
						<Task
							key={ task.id }
							{ ...task }
						/>
					))
				)
			}

			<div className='tasks__options'>
				<button className='tasks__delete' onClick={ remove }>
					Delete Project
					<FaTrashAlt />
				</button>

				<div className='tasks__options-edit'>
					<input
						type='text'
						name='title'
						className={ titleForm.trim().length < 3 ? 'tasks__options-input-error' : 'tasks__options-input' }
						placeholder='Project Title'
						autoComplete='off'
						value={ titleForm }
						onChange={ handleInputChange }
					/>

					<button
						className='tasks__options-edit__button'
						type='submit'
						disabled={ titleForm.trim().length < 3 ? true : false }
						onClick={ edit }
					>
						Edit Project
						<FaPencilAlt />
					</button>
				</div>
			</div>
		</section>
	);
}

export default TasksList;
