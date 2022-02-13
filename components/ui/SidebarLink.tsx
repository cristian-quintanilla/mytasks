import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { ProjectInterface } from '../../interfaces';

import { setActiveProject, getActiveProject } from '../../reducers/projectsReducer';
import { getTasks } from '../../reducers/tasksReducer';

const SidebarLink = ({ id, title }: ProjectInterface) => {
	const dispatch = useAppDispatch();
	const activeProject = useAppSelector(getActiveProject);

	//* Set active project
	const setActiveProjectHandler = () => {
		dispatch( setActiveProject(id) );
		dispatch( getTasks(id) );
	}

	return (
		<button
			className={ `sidebar__link${ activeProject?.id === id ? '-active' : '' }` }
			onClick={ setActiveProjectHandler }
		>
			{
				title.length > 20 ? (
					<>
						{ title.substring(0, 20) }...
					</>
				)	: ( title )
			}
		</button>
	);
}

export default SidebarLink;
