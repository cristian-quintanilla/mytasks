/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast';

import AlertError from '../components/ui/AlertError';
import InputForm from '../components/auth/InputForm';

import { getLoading } from '../reducers/uiReducer';
import { startRegisterWithEmailAndPassword } from '../reducers/authReducer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useForm } from '../hooks/useForm';
import validateRegister from '../validation/validateRegister';

const INITIAL_STATE = {
	name: '',
	email: '',
	password: ''
}

const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const loading = useAppSelector(getLoading);
	const router = useRouter();

	const { values, errors, handleBlur, handleInputChange, onSubmit } = useForm(
		INITIAL_STATE,
		validateRegister,
		register
	);

	const { name, email, password } = values;

	//* Register
	async function register() {
		const newUser = {
			name: name || '',
			email: email || '',
			password: password || '',
		}

		dispatch( startRegisterWithEmailAndPassword(newUser) );
		router.replace('/projects', '/projects', { shallow: true });
	}

	return (
		<>
			<Head>
				<title>MyTasks - Register</title>
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

							{ errors.name && <AlertError text={ errors.name } /> }
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

							{ errors.email && <AlertError text={ errors.email } /> }
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

							{ errors.password && <AlertError text={ errors.password } /> }
						</section>

						<button
							className='register__form-submit'
							type='submit'
							disabled={ loading || Object.keys(errors).length > 0 }
						>
							{ loading ? 'Loading...' : 'Register' }
						</button>
					</form>
				</section>
			</div>

			<Toaster
				position='top-center'
				reverseOrder={ false }
			/>
		</>
	);
}

export default RegisterPage;
