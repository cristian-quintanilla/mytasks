import { useState, useEffect } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

import Task from '../tasks/Task';

import { ProjectInterface } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { startEditingProject, startRemovingProject } from '../../reducers/projectsReducer';
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
	function handleRemove() {
		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: 'swal__button swal__button--confirm',
				denyButton: 'swal__button swal__button--deny',
			},
			buttonsStyling: false,
		});

		swalWithBootstrapButtons.fire({
			title: '<h1 class="h6 mb-sm">Do you want to remove the project?</h1>',
			showDenyButton: true,
			confirmButtonText: 'Remove',
			denyButtonText: `Don't Remove`,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch( startRemovingProject(project.id) );
			}
		});
	}

	//* Edit Project
	function handleEdit() {
		const editProjectData: ProjectInterface = {
			...project,
			title: titleForm
		};

		dispatch( startEditingProject(editProjectData) );
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
				<button className='tasks__delete' onClick={ handleRemove }>
					Delete Project
					<FaTrashAlt />
				</button>

				<div className='tasks__options--edit'>
					<input
						type='text'
						name='title'
						className={ titleForm.trim().length < 3 ? 'tasks__options--error' : 'tasks__options--input' }
						placeholder='Project Title'
						autoComplete='off'
						value={ titleForm }
						onChange={ handleInputChange }
					/>

					<button
						className='tasks__options--edit__button'
						type='submit'
						disabled={ titleForm.trim().length < 3 ? true : false }
						onClick={ handleEdit }
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
