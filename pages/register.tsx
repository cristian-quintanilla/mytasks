/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';

import InputForm from '../components/auth/InputForm';
import { useForm } from '../hooks/useForm';

const LoginPage = () => {
	const { formulario, handleInputChange } = useForm({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = formulario;

	//* Submit
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		console.log({ name, email, password });
	}

	return (
		<>
			<Head>
				<title>MyTasks - Login</title>
			</Head>

			<div className='container'>
				<section className='register'>
					<section className='register__login'>
						<h1 className='h3'>Welcome Back!</h1>
						<p className='text-light'>
							To keep connected with us please login with your personal info
						</p>

						<Link href='/login'>
							<a>Login</a>
						</Link>
					</section>

					<form className='register__form' onSubmit={ handleSubmit }>
						<h1 className='h3 uppercase'>Register</h1>

						<p className='text-dark'>Create an account</p>

						<section className='register__form-group'>
							<InputForm
								id='name'
								label='Name:'
								name='name'
								placeholder='Name'
								type='text'
								value={ name }
								onChange={ handleInputChange }
							/>
						</section>

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
							className='register__form-submit'
							type='submit'
						>
							Register
						</button>
					</form>
				</section>
			</div>
		</>
	);
}

export default LoginPage;
