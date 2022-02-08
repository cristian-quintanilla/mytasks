/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import SidebarLink from './SidebarLink';

const projects = [
	{
		id: 'project-1',
		title: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-2',
		title: 'Project 2',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-3',
		title: 'Project 3',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-4',
		title: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-5',
		title: 'Project 2',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-6',
		title: 'Project 3',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-7',
		title: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-8',
		title: 'Project 2',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	},
	{
		id: 'project-9',
		title: 'Project 3',
		tasks: [
			{
				id: '1',
				title: 'Task 1',
				description: 'This is a task description',
				done: false,
			},
			{
				id: '2',
				title: 'Task 2',
				description: 'This is a task description',
				done: false,
			},
		]
	}
];

const Layout = () => {
	const [ collapseShow, setCollapseShow ] = useState<string>('hidden');

	return (
		<>
			<nav className='sidebar'>
				<div className='sidebar__menu'>
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

								<h1 className='h3'>My Tasks</h1>
							</div>
						</div>

						{/* MENU */}
						<div className='sidebar__collapse-menu'>
							<nav className='sidebar__colapse-menu-items'>
								<button className='sidebar__create'>
									Create Project
								</button>

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
															text={ project.title }
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

							<button className='sidebar__collapse-menu-logout'>Logout</button>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Layout;
