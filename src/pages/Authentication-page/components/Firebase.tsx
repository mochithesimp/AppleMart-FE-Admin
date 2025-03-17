// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3BmLb_oZiZ7rcrsPLMy9scXOkWiscn-g",
  authDomain: "login-9b844.firebaseapp.com",
  projectId: "login-9b844",
  storageBucket: "login-9b844.firebasestorage.app",
  messagingSenderId: "744698241068",
  appId: "1:744698241068:web:f167c8cf36525a48fd3189"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
// export default app;
export { auth, provider, signInWithPopup, signOut, db };