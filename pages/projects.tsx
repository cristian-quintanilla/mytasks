import Head from 'next/head';

import Layout from '../components/ui/Layout';

const ProjectsPage = () => {
	return (
		<>
			<Head>
				<title>MyTasks - Projects</title>
			</Head>

			<Layout />

			<div className='content'>
				<h1>Projects</h1>
			</div>
		</>
	);
}

export default ProjectsPage;
