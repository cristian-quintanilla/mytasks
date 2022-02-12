import { initializeApp } from 'firebase/app';

import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	// signOut,
	updateProfile,
} from 'firebase/auth';

import {
	getFirestore,
	// query,
	// getDocs,
	// collection,
	// where,
	// addDoc,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	databaseURL: process.env.DATABASE_URL,
	projectId: process.env.PROJECT_ID,
	storageBucket: process.env.STORAGE_BUCKET,
	messagingSenderId: process.env.MESSAGING_SENDER_ID,
	appId: process.env.APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleAuthProvider = new GoogleAuthProvider();

export {
	auth,
	db,
	createUserWithEmailAndPassword,
	googleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
}
