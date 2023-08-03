// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu3-s5UPoL5PQJmeelTE2-HuGwWt6ebqs",
  authDomain: "react-social-posts.firebaseapp.com",
  projectId: "react-social-posts",
  storageBucket: "react-social-posts.appspot.com",
  messagingSenderId: "622913793344",
  appId: "1:622913793344:web:2fcaa0ee6d1e1d11a6dea5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);