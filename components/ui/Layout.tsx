/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import NewProject from '../projects/NewProject';
import SidebarLink from './SidebarLink';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { openCloseForm, selectNewProject } from '../../reducers/uiReducer';
import { getProjects } from '../../reducers/projectsReducer';

const Layout = () => {
	const dispatch = useAppDispatch();
	const form = useAppSelector(selectNewProject);
	const projects = useAppSelector(getProjects);

	const [ collapseShow, setCollapseShow ] = useState<string>('hidden');

	//* Show/hide form for new project
	const toggleNewProjectForm = () => {
		dispatch(openCloseForm());
	};

	return (
		<>
			<Head>
				<title>MyTasks</title>
			</Head>

			<aside className='sidebar'>
				<nav className='sidebar__menu'>
					{/* Toggler */}
					<div className='sidebar__menu-toggler'>
						<button onClick={ () => setCollapseShow('menu-responsive') }>
							<FaBars />
						</button>
					</div>

					{/* Brand */}
					<h1 className='sidebar__heading mb-sm'>
						My Tasks
					</h1>

					{/* Collapse:  */}
					<div className={`sidebar__collapse ${ collapseShow }`}>
						<div className='sidebar__collapse-head'>
							<div className='sidebar__collapse-head--title'>
								<div className='sidebar__collapse-head--close'>
								 <button onClick={ () => setCollapseShow('hidden') }>
									 <FaTimes />
								 </button>
								</div>
							</div>

							<h1 className='h3'>My Tasks</h1>
						</div>

						{/* MENU */}
						<div className='sidebar__collapse-menu'>
							<nav className='sidebar__colapse-menu-items'>
								<button
									className='sidebar__create'
									onClick={ toggleNewProjectForm }
								>
									{
										!!form
										? 'Close'
										: 'Create Project'
									}
								</button>

								{
									!!form && <NewProject />
								}

								<hr className='separator' />

								<section className='sidebar__projects'>
									{
										projects.length !== 0 ? (
											<>
												<h1 className='projects-title'>Your Projects</h1>
												{
													projects.map(project => (
														<SidebarLink
															key={ project.id }
															{ ...project }
														/>
													))
												}
											</>
										) : (
											<h1 className='text-dark'>You don't have projects. Start creating one.</h1>
										)
									}
								</section>
							</nav>
						</div>
					</div>
				</nav>
			</aside>
		</>
	);
}

export default Layout;
