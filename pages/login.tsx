/* eslint-disable react/no-unescaped-entities */
import Head from 'next/head';
import Link from 'next/link';

import { BsGoogle, BsFacebook, BsTwitter } from 'react-icons/bs';

const LoginPage = () => {
	return (
		<>
			<Head>
				<title>MyTasks - Login</title>
				{/* <link rel='shortcut icon' href='/static/img/web_icon.ico' /> */}
			</Head>

			<div className='login'>
				<form className='login__form'>
					<h1>Login</h1>

					<section className='login__social'>
						<button type='button' className='login__social-button'>
							<BsGoogle />
						</button>

						<button type='button' className='login__social-button'>
							<BsFacebook />
						</button>

						<button type='button' className='login__social-button'>
							<BsTwitter />
						</button>
					</section>

					<p className='login__text'>or use your account</p>

					<section className='login__form-group'>
						<label
							htmlFor='email'
							className='login__form-group-label'
						>
							Email:
						</label>

						<input
							type='email'
							className='login__form-group-input'
							id='email'
							placeholder='Email'
						/>
					</section>

					<section className='login__form-group'>
						<label
							htmlFor='password'
							className='login__form-group-label'
						>
							Password:
						</label>

						<input
							type='password'
							className='login__form-group-input'
							id='password'
							placeholder='Password'
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
					<h1>Hello, Friend!</h1>
					<p>
						You don't have an account? You can create one here:
					</p>

					<Link href='/register'>
						<a>Register</a>
					</Link>
				</section>
			</div>
		</>
	);
}

export default LoginPage;
