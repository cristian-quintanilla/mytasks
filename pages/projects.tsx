import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Layout from '../components/ui/Layout';
import Header from '../components/ui/Header';
import Project from '../components/projects/Project';
import Spinner from '../components/ui/Spinner';

import { checkAuth } from '../firebase/config';
import { useAppDispatch } from '../store/hooks';
import { login } from '../reducers/authReducer';

const ProjectsPage = () => {
	const dispatch = useAppDispatch();

	const [ checking, setChecking ] = useState<boolean>(true);
	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

	//* Get the user from the firebase auth
	useEffect(() => {
		checkAuth(async (user) => {
			if (user?.uid) {
				const { uid, displayName } = user;

				dispatch( login({ uid, name: displayName || '' }) );
				setIsLoggedIn(true);

				// TODO: Start Loading Projects
				// dispatch( startLoadingNotes(uid) );
			} else {
				setIsLoggedIn(false);
			}

			setChecking(false);
		});
	}, [dispatch, setIsLoggedIn]);

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
			{
				isLoggedIn && (
				<>
					<Layout />

					<main className='content'>
						<Header />
						<Project />
					</main>
				</>
				)
			}
		</>
	);
}

export default ProjectsPage;
