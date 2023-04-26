import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAVASjS7ij4pqWgR8LBg5Q4rD1lxomRVFU",
  authDomain: "todolist-cc8c7.firebaseapp.com",
  projectId: "todolist-cc8c7",
  storageBucket: "todolist-cc8c7.appspot.com",
  messagingSenderId: "499805044742",
  appId: "1:499805044742:web:53944125ac8d43c1848387",
  measurementId: "G-TRYMEHLZTK"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
export const db = getFirestore(app);
const analytics = getAnalytics(app);