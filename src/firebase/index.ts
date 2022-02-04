// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDC-_SirHr83W_n8E49Ggs5cSJ6nmmWPg0',
  authDomain: 'typer-speed.firebaseapp.com',
  projectId: 'typer-speed',
  storageBucket: 'typer-speed.appspot.com',
  messagingSenderId: '559877244110',
  appId: '1:559877244110:web:3ab742d43b13d76cba7c9f',
  measurementId: 'G-9HEKMPKR0Z',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
