import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import toast from 'react-hot-toast';

import {
	auth,
	createUserWithEmailAndPassword,
	googleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
} from '../firebase/config';

import { RootState } from '../store/store';
import { AuthInterface, LoginRecordsInterface, NewUserInterface } from '../interfaces';
import { startLoading, stopLoading } from './uiReducer';
import { cleanProjects } from './projectsReducer';
import { cleanTasks } from './tasksReducer';

const initialState: AuthInterface = {
	uid: '',
	name: '',
};

export const toastOptions = {
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
			state.uid = '';
			state.name = '';
		},
	},
});

export const { login, logout } = authSlice.actions;

//* Start Google Login
export const startLoginGoogle = createAsyncThunk(
	'auth/startLoginGoogle',
	async (_, { dispatch }) => {
		try {
			const { user } = await signInWithPopup(auth, googleAuthProvider);
			const { uid, displayName } = user;

			dispatch( login({ uid, name: displayName || '' }));
		} catch (err) {
			console.log(err);
		}
	}
);

//* Start Register with Email and Password
export const startRegisterWithEmailAndPassword = createAsyncThunk(
	'auth/startRegisterWithEmailAndPassword',
	async (newUser: NewUserInterface, { dispatch }) => {
		const { email, name, password } = newUser;

		try {
			dispatch( startLoading() );
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			const currentUser: User = auth.currentUser as User;
			await updateProfile(currentUser, { displayName: name });

			const { uid, displayName } = user;

			dispatch( authSlice.actions.login({ uid, name: displayName || '' }));
			dispatch( stopLoading() );
		} catch (error) {
			let errorMessage = '';

			if (error instanceof FirebaseError) {
				if (error.code === 'auth/email-already-in-use') {
					errorMessage = 'Email already exists.';
				}
			}

			toast.error(errorMessage, toastOptions);
			dispatch( stopLoading() );
		}
	}
);

//* Start Login with Email and Password
export const startLoginWithEmailAndPassword = createAsyncThunk(
	'auth/startLoginWithEmailAndPassword',
	async (records: LoginRecordsInterface, { dispatch }) => {
		const { email, password } = records;
		dispatch( startLoading() );

		try {
			const { user } = await signInWithEmailAndPassword(auth, email, password);
			const { uid, displayName } = user;

			dispatch( login({ uid, name: displayName || '' }));
			dispatch( stopLoading() );
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

			toast.error(errorMessage, toastOptions);
			dispatch( stopLoading() );
		}
	}
);

//* Start Sign Out
export const startSignOut = createAsyncThunk(
	'auth/startSignOut',
	async (_, { dispatch }) => {
		await signOut(auth);

		dispatch( logout() );
		dispatch( cleanProjects() );
		dispatch( cleanTasks() );
	}
);

//* Get Authenticated User
export const getUser = (state: RootState) => {
	const user = {
		uid: state.auth.uid,
		name: state.auth.name,
	};

	return user;
};

export default authSlice.reducer;
