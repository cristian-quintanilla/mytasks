import { MdRemoveDone, MdOutlineDoneAll } from 'react-icons/md';
import Swal from 'sweetalert2';

import { TaskInterface } from '../../interfaces';
import { useAppDispatch } from '../../store/hooks';
import { setActiveTask, startEditingTask, startRemovingTask } from '../../reducers/tasksReducer';

const Task = (task: TaskInterface) => {
	const dispatch = useAppDispatch();
	const { id, done, title } = task;

	//* Mark task as done or not done
	const handleDone = () => {
		const taskEdit: TaskInterface = {
			...task,
			done: !done
		}

		dispatch( startEditingTask(taskEdit) );
	}

	//* Set active task to be edited
	const handleEdit = () => {
		dispatch( setActiveTask(task) );
	}

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
			title: '<h1 class="h6 mb-sm">Do you want to remove the task?</h1>',
			showDenyButton: true,
			confirmButtonText: 'Remove',
			denyButtonText: `Don't Remove`,
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch( startRemovingTask(id) );
			}
		});
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

				<button onClick={ handleEdit }>Edit</button>
				<button onClick={ handleRemove }>Delete</button>
			</li>
		</ul>
	);
}

export default Task;
