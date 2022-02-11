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
					{ done ? 'Done' : 'Not done' }
				</span>
				<button>Edit</button>
				<button>Delete</button>
			</li>
		</ul>
	);
}

export default Task;
