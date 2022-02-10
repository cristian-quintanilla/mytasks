interface Props {
	title: string;
	description: string;
	done: boolean;
}

const Task = ({ title, description, done }: Props) => (
	<div>
		<li>{ title }</li>
		<li>{ description }</li>
		<li>{ done.toString() }</li>
	</div>
);

export default Task;
