import toast from 'react-hot-toast';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import {
	auth,
	createUserWithEmailAndPassword,
	googleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from '../firebase/config';

import { AppDispatch, AppThunk } from '../store/store';
import { AuthInterface, LoginRecordsInterface, NewUserInterface } from '../interfaces';

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

export const startLoginGoogle = (): AppThunk => {
	return async (dispatch: AppDispatch) => {
		try {
			const { user } = await signInWithPopup(auth, googleAuthProvider);
			const { uid, displayName } = user;

			dispatch( authSlice.actions.login({ uid, name: displayName || '' }));
		} catch (err) {
			console.log(err);
		}
	}
}

export const startEmailAndPasswordRegister = (newUser: NewUserInterface): AppThunk => {
	const { name, email, password } = newUser;

	return async (dispatch: AppDispatch) => {
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
}

export const startLoginWithEmailAndPassword = (records: LoginRecordsInterface): AppThunk => {
	const { email, password } = records;

	return async (dispatch: AppDispatch) => {
		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const { uid, displayName } = user;

			dispatch( authSlice.actions.login({ uid, name: displayName || '' }));
		} catch (error) {
			let errorMessage = '';

			if (error instanceof FirebaseError) {
				if (error.code === 'auth/invalid-email') {
					errorMessage = 'Invalid email address.';
				} else if (error.code === 'auth/user-not-found') {
					errorMessage = 'User not found. Please register.';
				} else if (error.code === 'auth/wrong-password') {
					errorMessage = 'Wrong password.';
				}
			}

			toast.error(errorMessage,
				{
					duration: 4000,
					style: {
						border: '2px solid #F44336',
						padding: '16px',
						fontSize: '1.6rem',
						fontWeight: 'bold',
						color: '#F44336',
					},
					iconTheme: {
						primary: '#F44336',
						secondary: '#FFFAEE',
					},
				},
			);
		}
	}
}

export default authSlice.reducer;
