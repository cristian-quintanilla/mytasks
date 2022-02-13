import Link from 'next/link';
import Head from 'next/head';

import Layout from '../components/ui/Layout';
import Header from '../components/ui/Header';
import Project from '../components/projects/Project';
import Spinner from '../components/ui/Spinner';

import useAuth from '../hooks/useAuth';

const ProjectsPage = () => {
	const { checking, isLoggedIn } = useAuth();

	if (checking) {
		return <Spinner />;
	}

	if (!isLoggedIn) {
		return (
			<>
				<Head>
					<title>MyTasks</title>
				</Head>
				<div className='container'>
					<h1 className='h4'>You must be logged in to view this page</h1>

					<p className='log-in'>
						<Link href='/login'>
							<a>Login</a>
						</Link>
					</p>
				</div>
			</>
		);
	}

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
