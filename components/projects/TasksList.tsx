import { FaTrashAlt } from 'react-icons/fa';

import Task from './Task';
import { ProjectInterface } from '../../interfaces';

const TasksList = (project: ProjectInterface) => {
	return (
		<section className='tasks'>
			<h2 className='tasks__title'>Project: { project.title }</h2>

			{
				project.tasks?.length === 0 ? (
					<p>No tasks</p>
				) : (
					project.tasks?.map(task => (
						<Task
							key={ task.id }
							{ ...task }
						/>
					))
				)
			}

			<button className='tasks__delete'>
				Delete Project
				<FaTrashAlt />
			</button>
		</section>
	);
}

export default TasksList;
