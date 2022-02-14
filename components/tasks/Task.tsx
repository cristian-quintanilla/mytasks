import { MdRemoveDone, MdOutlineDoneAll } from 'react-icons/md';

interface Props {
	title: string;
	done: boolean;
}

const Task = ({ title, done }: Props) => {
	return (
		<ul className='task'>
			<li className='task__title'>{ title }</li>

			<li className='task__options'>
				<span className={ done ? 'task__complete' : 'task__incomplete' }>
					{
						done ? <MdOutlineDoneAll /> : <MdRemoveDone />
					}
				</span>
				<button>Edit</button>
				<button>Delete</button>
			</li>
		</ul>
	);
}

export default Task;
