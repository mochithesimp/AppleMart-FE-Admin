import { initializeApp } from "firebase/app";
 
import { getStorage } from "firebase/storage"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3BmLb_oZiZ7rcrsPLMy9scXOkWiscn-g",
  authDomain: "login-9b844.firebaseapp.com",
  projectId: "login-9b844",
  storageBucket: "login-9b844.firebasestorage.app",
  messagingSenderId: "744698241068",
  appId: "1:744698241068:web:f167c8cf36525a48fd3189"
};

// Khởi tạo Firebase App
const app = initializeApp(firebaseConfig);

// Khởi tạo Firebase Storage
export const storage = getStorage(app);