/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

import InputForm from '../components/auth/InputForm';
import Social from '../components/auth/Social';

interface FormData {
	email: string;
	password: string;
}

const LoginPage = () => {
	const [ formulario, setFormulario ] = useState<FormData>({
		email: '',
		password: '',
	});

	//* Input Change
	const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = target;

		setFormulario({
			...formulario,
			[name]: value
		});
	}

	//* Submit
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log(formulario);
	}

	return (
		<>
			<Head>
				<title>MyTasks - Login</title>
			</Head>

			<div className='container'>
				<section className='login'>
					<form className='login__form' onSubmit={ handleSubmit }>
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
								value={ formulario.email }
								onChange={ handleInputChange }
							/>
						</section>

						<section className='login__form-group'>
							<InputForm
								id='password'
								label='Password:'
								name='password'
								placeholder='Password'
								type='password'
								value={ formulario.password }
								onChange={ handleInputChange }
							/>
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
