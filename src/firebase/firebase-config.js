import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyD7nZmHMr15CnUFMbfQYbR7phq6Z3bs4O4",
    authDomain: "react-app-firebase-4640b.firebaseapp.com",
    projectId: "react-app-firebase-4640b",
    storageBucket: "react-app-firebase-4640b.appspot.com",
    messagingSenderId: "692792453027",
    appId: "1:692792453027:web:7fa0f88fefada05d521c16"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}