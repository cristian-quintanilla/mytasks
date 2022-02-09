/* eslint-disable react/no-unescaped-entities */
// import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// import Router from 'next/router';

import InputForm from '../components/auth/InputForm';
import Social from '../components/auth/Social';

import validateLogin from '../validation/validateLogin';
import { useForm } from '../hooks/useForm';

const INITIAL_STATE = {
	email: '',
	password: ''
}

const LoginPage = () => {
	// const [ errorMessage, setErrorMessage ] = useState<boolean>(false);

	const {
		values,
		errors,
		handleBlur,
		handleInputChange,
		onSubmit
	} = useForm(INITIAL_STATE, validateLogin, iniciarSesion);

	const { email, password } = values;

	//* Login
	async function iniciarSesion() {
		console.log('Iniciando sesión...');
		console.log({ email, password });
	}

	return (
		<>
			<Head>
				<title>MyTasks - Login</title>
			</Head>

			<div className='container'>
				<section className='login'>
					<form className='login__form' onSubmit={ onSubmit }>
						<h1 className='h3 uppercase'>Login</h1>

						<Social />
						<p className='text-dark mb-sm'>or use your account</p>

						<section className='login__form-group'>
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

							{
								errors.email && (
									<p>{ errors.email }</p>
								)
							}
						</section>

						<section className='login__form-group'>
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
							{
								errors.password && (
									<p>{ errors.password }</p>
								)
							}
						</section>

						<button
							className='login__form-submit'
							type='submit'
						>
							Login
						</button>
					</form>

					<section className='login__register'>
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
		</>
	);
}

export default LoginPage;
