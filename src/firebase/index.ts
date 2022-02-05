// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore, collection } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'typer-speed.firebaseapp.com',
  projectId: 'typer-speed',
  storageBucket: 'typer-speed.appspot.com',
  messagingSenderId: '559877244110',
  appId: '1:559877244110:web:3ab742d43b13d76cba7c9f',
  measurementId: 'G-9HEKMPKR0Z',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const testsRef = collection(db, 'typingTests')
export const statsRef = collection(db, 'stats')
const analytics = getAnalytics(app)
