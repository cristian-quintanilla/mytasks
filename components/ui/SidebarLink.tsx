import { useAppDispatch } from '../../store/hooks';
import { ProjectInterface } from '../../interfaces';

import { setActiveProject } from '../../reducers/projectsReducer';
import { getTasks } from '../../reducers/tasksReducer';

const SidebarLink = ({ id, title }: ProjectInterface) => {
	const dispatch = useAppDispatch();

	//* Set active project
	const setActiveProjectHandler = () => {
		dispatch( setActiveProject(id) );
		dispatch( getTasks(id) );
	}

	return (
		<button
			className='sidebar__link'
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
