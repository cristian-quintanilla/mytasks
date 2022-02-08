import { useState } from 'react';

import { FaBars, FaTimes } from 'react-icons/fa';

const Layout = () => {
	const [ collapseShow, setCollapseShow ] = useState<string>('hidden');

	return (
		<>
			<nav className='sidebar'>
				<div className='sidebar__menu'>
					{/* Toggler */}
					<div className='sidebar__menu-toggler'>
						<button
							onClick={ () => setCollapseShow('menu-responsive') }
						>
							<FaBars />
						</button>
					</div>

					{/* Brand */}
					<h1 className='sidebar__heading mb-sm'>
						My_Tasks
					</h1>

					{/* Collapse:  */}
					<div className={`sidebar__collapse ${ collapseShow }`}>
						<div className='sidebar__collapse-head'>
							<div className='sidebar__collapse-head--title'>
								<h1 className='h3 mb-sm'>
									My_Tasks
								</h1>

								<div className='sidebar__collapse-head--content'>
								 <button onClick={ () => setCollapseShow('hidden') }>
									 <FaTimes />
								 </button>
								</div>
							</div>
						</div>

						{/* MENU */}
						<div className='sidebar__collapse-menu'>
							<nav className='sidebar__colapse-menu-items'>
								<div>links</div>
								<div>links</div>
								<div>links</div>
							</nav>

							<div className='sidebar__collapse-menu-logout'>
								<button>Logout</button>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}

export default Layout;
