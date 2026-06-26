import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authintellinotes.firebaseapp.com",
  projectId: "authintellinotes",
  storageBucket: "authintellinotes.firebasestorage.app",
  messagingSenderId: "1078321626967",
  appId: "1:1078321626967:web:293ac8e49d7b71e31dc812"
};

const app = initializeApp(firebaseConfig);

const auth= getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };