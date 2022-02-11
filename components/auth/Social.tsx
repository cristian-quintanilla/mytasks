import { BsGoogle, BsFacebook, BsTwitter } from 'react-icons/bs';

import { useAppDispatch } from '../../store/hooks';
import { startLoginGoogle } from '../../reducers/authReducer';

const Social = () => {
	const dispatch = useAppDispatch();

	//* Google
	const googleLogin = () => {
		dispatch( startLoginGoogle() );
	}

	//* Facebook
	const facebookLogin = () => {
		console.log('Facebook login');
	}

	//* Twitter
	const twitterLogin = () => {
		console.log('Twitter login');
	}

	return (
		<section className='login__social'>
			<button
				type='button'
				className='login__social-button'
				onClick={ googleLogin }
			>
				<BsGoogle />
			</button>

			<button
				type='button'
				className='login__social-button'
				onClick={ facebookLogin }
			>
				<BsFacebook />
			</button>

			<button
				type='button'
				className='login__social-button'
				onClick={ twitterLogin }
			>
				<BsTwitter />
			</button>
		</section>
	);
}

export default Social;
