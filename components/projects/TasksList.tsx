import Task from './Task';

interface Task {
	id: string;
	title: string;
	description: string;
	done: boolean;
}

interface Props {
	id: string;
	title: string;
	tasks: Task[];
}

const TasksList = (project: Props) => {
	return (
		<section>
			<h2>Project: { project.title }</h2>

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

			<button>
				Delete Project
			</button>
		</section>
	);
}

export default TasksList;
