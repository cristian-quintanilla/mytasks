import { FaTrashAlt } from 'react-icons/fa';

import Task from './Task';

import { ProjectInterface } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { removeProject } from '../../reducers/projectsReducer';

const TasksList = (project: ProjectInterface) => {
	const dispatch = useAppDispatch();

	//* Remove project
	function remove() {
		dispatch( removeProject(project.id) );
	}

	return (
		<section className='tasks'>
			<h2 className='tasks__title'>Project: { project.title }</h2>

			{
				project.tasks?.length === 0 ? (
					<p className='tasks__no-tasks'>No tasks. Start creating one.</p>
				) : (
					project.tasks?.map(task => (
						<Task
							key={ task.id }
							{ ...task }
						/>
					))
				)
			}

			<button className='tasks__delete' onClick={ remove }>
				Delete Project
				<FaTrashAlt />
			</button>
		</section>
	);
}

export default TasksList;
