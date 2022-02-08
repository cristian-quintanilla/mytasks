/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';

const LoginPage = () => {
	return (
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

				<form className='register__form'>
					<h1 className='h3 uppercase'>Register</h1>

					<p className='text-dark'>Create an account</p>

					<section className='register__form-group'>
						<label
							htmlFor='name'
							className='register__form-group-label'
						>
							Name:
						</label>

						<input
							type='text'
							id='name'
							className='register__form-group-input'
							placeholder='Name'
							autoComplete='off'
						/>
					</section>

					<section className='register__form-group'>
						<label
							htmlFor='email'
							className='register__form-group-label'
						>
							Email:
						</label>

						<input
							type='email'
							id='email'
							className='register__form-group-input'
							placeholder='Email'
							autoComplete='off'
						/>
					</section>

					<section className='register__form-group'>
						<label
							htmlFor='password'
							className='register__form-group-label'
						>
							Password:
						</label>

						<input
							type='password'
							className='register__form-group-input'
							id='password'
							placeholder='Password'
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
	);
}

export default LoginPage;
