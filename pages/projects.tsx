import Layout from '../components/ui/Layout';
import Header from '../components/ui/Header';
import Project from '../components/projects/Project';

const ProjectsPage = () => {
	return (
		<>
			<Layout />

			<main className='content'>
				<Header />

				<Project />
			</main>
		</>
	);
}

export default ProjectsPage;
