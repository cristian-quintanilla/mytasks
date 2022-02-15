import { MdRemoveDone, MdOutlineDoneAll } from 'react-icons/md';

import { TaskInterface } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { startEditingTask } from '../../reducers/tasksReducer';

const Task = (task: TaskInterface) => {
	const dispatch = useAppDispatch();
	const { id, done, project, title } = task;

	//* Mark task as done or not done
	const handleDone = () => {
		const taskEdit: TaskInterface = {
			...task,
			done: !done
		}

		dispatch( startEditingTask(taskEdit) );
	}

	return (
		<ul className='task'>
			<li className='task__title'>{ title }</li>

			<li className='task__options'>
				<span
					className={ done ? 'task__complete' : 'task__incomplete' }
					onClick={ handleDone }
				>
					{ done ? <MdOutlineDoneAll /> : <MdRemoveDone /> }
				</span>

				<button>Edit</button>
				<button>Delete</button>
			</li>
		</ul>
	);
}

export default Task;
