/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';

import InputForm from '../components/auth/InputForm';
import Social from '../components/auth/Social';
import { useForm } from '../hooks/useForm';

const LoginPage = () => {
	const { formulario, handleInputChange } = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formulario;

	//* Submit
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log({ email, password });
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
								value={ email }
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
								value={ password }
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
