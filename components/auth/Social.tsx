import { BsGoogle } from 'react-icons/bs';

import { useAppDispatch } from '../../store/hooks';
import { startLoginGoogle } from '../../reducers/authReducer';

const Social = () => {
	const dispatch = useAppDispatch();

	//* Google Login
	const googleLogin = () => {
		dispatch( startLoginGoogle() );
	}

	return (
		<section className='auth-form__social'>
			<button
				type='button'
				className='auth-form__social--button'
				onClick={ googleLogin }
			>
				<BsGoogle />
				<span>Sign in with Google</span>
			</button>
		</section>
	);
}

export default Social;
