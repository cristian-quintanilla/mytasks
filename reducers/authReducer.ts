import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

import {
	auth,
	googleAuthProvider,
	signInWithPopup,
	createUserWithEmailAndPassword,
	updateProfile,
} from '../firebase/config';

import { AppDispatch, AppThunk } from '../store/store';
import { AuthInterface, NewUserInterface } from '../interfaces';

const initialState: AuthInterface = {
	uid: '',
	name: '',
};

export const authSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<AuthInterface>) => {
			const { uid, name } = action.payload;

			state.uid = uid;
			state.name = name;
		},
		logout: (state) => {
			console.log('logout');
		},
	},
});

// https://github.com/atharvadeosthale/firebase-auth-article/blob/master/src/firebase.js

export const startLoginGoogle = (): AppThunk => async (dispatch: AppDispatch) => {
	try {
		const { user } = await signInWithPopup(auth, googleAuthProvider);
		const { uid, displayName } = user;

		dispatch( authSlice.actions.login({ uid, name: displayName || '' }));
	} catch (err) {
		console.log(err);
	}
}

export const startEmailAndPasswordRegister = (newUser: NewUserInterface): AppThunk => async (dispatch: AppDispatch) => {
	const { name, email, password } = newUser;

	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		const currentUser: User = auth.currentUser as User;
		await updateProfile(currentUser, { displayName: name });

		const { uid, displayName } = user;
		dispatch( authSlice.actions.login({ uid, name: displayName || '' }));
	} catch (err) {
		console.log(err);
	}
}

export default authSlice.reducer;
