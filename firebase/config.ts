import { initializeApp } from 'firebase/app';

import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	NextOrObserver,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	User,
} from 'firebase/auth';

import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	getFirestore,
	query,
	updateDoc,
	where,
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

const checkAuth = (callback: NextOrObserver<User | null>) => auth.onAuthStateChanged(callback);

export {
	addDoc,
	auth,
	checkAuth,
	collection,
	createUserWithEmailAndPassword,
	db,
	deleteDoc,
	doc,
	getDocs,
	googleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	query,
	updateDoc,
	updateProfile,
	where,
}
