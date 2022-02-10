import { useAppDispatch } from '../../store/hooks';
import { setActiveProject } from '../../reducers/projectsReducer';
import { ProjectInterface } from '../../interfaces';

const SidebarLink = ({ id, title, tasks }: ProjectInterface) => {
	const dispatch = useAppDispatch();

	//* Set active project
	const setActiveProjectHandler = (project: ProjectInterface) => {
		dispatch(setActiveProject(project));
	}

	return (
		<button
			className='sidebar__link'
			onClick={ () => setActiveProjectHandler({ id, title, tasks }) }
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
