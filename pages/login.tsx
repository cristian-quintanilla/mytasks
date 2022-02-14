/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

import AlertError from '../components/ui/AlertError';
import InputForm from '../components/auth/InputForm';
import Social from '../components/auth/Social';

import { getLoading } from '../reducers/uiReducer';
import { startLoginWithEmailAndPassword } from '../reducers/authReducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useForm } from '../hooks/useForm';
import useAuth from '../hooks/useAuth';
import validateLogin from '../validation/validateLogin';

const INITIAL_STATE = {
	email: '',
	password: ''
}

const LoginPage = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(getLoading);
	const router = useRouter();
	const { isLoggedIn } = useAuth();

	const { values, errors, handleBlur, handleInputChange, onSubmit } = useForm(
		INITIAL_STATE,
		validateLogin,
		loginUser
	);

	const { email, password } = values;

	//* User is logged in
	useEffect(() => {
		if (isLoggedIn) {
			router.replace('/projects', '/projects', { shallow: true });
		}
	}, [isLoggedIn, router]);

	//* Login
	async function loginUser() {
		const records = {
			email: email || '',
			password: password || ''
		}

		dispatch( startLoginWithEmailAndPassword(records) );
	}

	return (
		<>
			<Head>
				<title>MyTasks - Login</title>
			</Head>

			<div className='container'>
				<section className='auth'>
					<form className='auth-form' onSubmit={ onSubmit }>
						<h1 className='h3 uppercase'>Login</h1>

						<Social />
						<p className='text-dark'>or use your account</p>

						<section className='auth-form__group'>
							<InputForm
								id='email'
								label='Email:'
								name='email'
								placeholder='Email'
								type='email'
								value={ email }
								onBlur={ handleBlur }
								onChange={ handleInputChange }
							/>

							{ errors.email && <AlertError text={ errors.email } /> }
						</section>

						<section className='auth-form__group'>
							<InputForm
								id='password'
								label='Password:'
								name='password'
								placeholder='Password'
								type='password'
								value={ password }
								onBlur={ handleBlur }
								onChange={ handleInputChange }
							/>

							{ errors.password && <AlertError text={ errors.password } /> }
						</section>

						<button
							className='auth-form__submit'
							type='submit'
							disabled={ loading || Object.keys(errors).length > 0 }
						>
							{ loading ? 'Loading...' : 'Login' }
						</button>
					</form>

					<section className='auth-aside'>
						<h1 className='h3'>Hello, Friend!</h1>
						<p className='text-light'>
							You don't have an account? You can create one here:
						</p>

						<Link href='/register'>
							<a>Register</a>
						</Link>
					</section>
				</section>
			</div>

			<Toaster
				position='top-center'
				reverseOrder={ false }
			/>
		</>
	);
}

export default LoginPage;
