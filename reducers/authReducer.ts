import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
	auth, googleAuthProvider, signInWithPopup, createUserWithEmailAndPassword
} from '../firebase/config';

import { AppDispatch, AppThunk } from '../store/store';
import { AuthInterface } from '../interfaces';

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
		const result = await signInWithPopup(auth, googleAuthProvider);
		const { uid, displayName } = result.user;

		dispatch( authSlice.actions.login({ uid, name: displayName || '' }));
	} catch (err) {
		console.log(err);
	}
}

export const startEmailAndPasswordRegister = (email: string, password: string): AppThunk => async (dispatch: AppDispatch) => {
	try {
		const result = await createUserWithEmailAndPassword(auth, email, password);
		const { uid, displayName } = result.user;

		dispatch( authSlice.actions.login({ uid, name: displayName || '' }));
	} catch (err) {
		console.log(err);
	}
}

export default authSlice.reducer;
