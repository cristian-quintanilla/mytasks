import { FaTrashAlt } from 'react-icons/fa';
import Task from './Task';

interface Task {
	id: string;
	title: string;
	done: boolean;
}

interface Props {
	id: string;
	title: string;
	tasks: Task[];
}

const TasksList = (project: Props) => {
	return (
		<section className='tasks'>
			<h2 className='tasks__title'>Project: { project.title }</h2>

			{
				project.tasks.length === 0 ? (
					<p>No tasks</p>
				) : (
					project.tasks.map(task => (
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
