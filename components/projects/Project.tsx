import AddEditTask from './AddEditTask';
import TasksList from './TasksList';

import { useAppSelector } from '../../store/hooks';
import { getActiveProject } from '../../reducers/projectsReducer';

const Project = () => {
	const activeProject = useAppSelector(getActiveProject);

	return (
    <>
			{
				activeProject ? (
					<>
						<AddEditTask />
      			<TasksList { ...activeProject } />
					</>
				) : (
					<section className='tasks'>
						<h2 className='tasks__title'>No Project. Please select one.</h2>
					</section>
				)
			}
    </>
  );
}

export default Project;
