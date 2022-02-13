import { getUser, startSignOut } from '../../reducers/authReducer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

const Header = () => {
	const dispatch = useAppDispatch();
	const { name } = useAppSelector(getUser);

	//* Sign out
	const handleSignOut = () => {
		dispatch( startSignOut() );
	}

	return (
		<header className='header'>
			<div className='header__title'>
				Welcome, { name }!
			</div>

			<div>
				<button className='header__button' onClick={ handleSignOut }>
					Sign Out
				</button>
			</div>
		</header>
	);
};

export default Header;
