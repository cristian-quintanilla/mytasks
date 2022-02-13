import { useEffect, useState } from 'react';

import { auth } from '../firebase/config';
import { useAppDispatch } from '../store/hooks';
import { login } from '../reducers/authReducer';

function useAuth() {
	const dispatch = useAppDispatch();

	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);
	const [ checking, setChecking ] = useState<boolean>(true);

	useEffect(() => {
		const unsuscribe = auth.onAuthStateChanged((user) => {
			if (user?.uid) {
				const { uid, displayName } = user;

				dispatch( login({ uid, name: displayName || '' }) );
				setIsLoggedIn(true);

				// TODO: Start Loading Projects
				// dispatch( startLoadingProjects(uid) );
			} else {
				setIsLoggedIn(false);
			}

			setChecking(false);
		});

		return () => unsuscribe();
	}, [dispatch]);

	return {
		isLoggedIn,
		checking,
	};
}

export default useAuth;
