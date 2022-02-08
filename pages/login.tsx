/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

import { BsGoogle, BsFacebook, BsTwitter } from 'react-icons/bs';

const LoginPage = () => {
	return (
		<div className='container'>
			<section className='login'>
				<form className='login__form'>
					<h1 className='h3 uppercase'>Login</h1>

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

					<p className='text-dark mb-sm'>or use your account</p>

					<section className='login__form-group'>
						<label
							htmlFor='email'
							className='login__form-group-label'
						>
							Email:
						</label>

						<input
							type='email'
							id='email'
							className='login__form-group-input'
							placeholder='Email'
							autoComplete='off'
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
	);
}

export default LoginPage;
