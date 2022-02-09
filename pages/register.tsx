/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';

import InputForm from '../components/auth/InputForm';

import validateRegister from '../validation/validateRegister';
import { useForm } from '../hooks/useForm';

const INITIAL_STATE = {
	name: '',
	email: '',
	password: ''
}

const LoginPage = () => {
	const {
		values,
		errors,
		handleBlur,
		handleInputChange,
		onSubmit
	} = useForm(INITIAL_STATE, validateRegister, register);

	const { name, email, password } = values;

	//* Register
	async function register() {
		console.log('Registrando...');
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

					<form className='register__form' onSubmit={ onSubmit }>
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
								onBlur={ handleBlur }
								onChange={ handleInputChange }
							/>

							{
								errors.name && (
									<p>{ errors.name }</p>
								)
							}
						</section>

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
