import AddEditTask from './AddEditTask';
import TasksList from './TasksList';

const project = {
	id: 'project-1',
	title: 'Lorem ipsum dolor sit.',
	tasks: [
		{
			id: '1',
			title: 'Task 1',
			done: false,
		},
		{
			id: '2',
			title: 'Task 2',
			done: true,
		},
	]
};

const Project = () => {
  return (
    <>
      <AddEditTask />
      <TasksList { ...project } />
    </>
  );
}

export default Project;
