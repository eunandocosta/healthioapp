// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdAS4hAI02QwTDI-J7F0dMMVBc4xu3ask",
  authDomain: "healthio-sys.firebaseapp.com",
  projectId: "healthio-sys",
  storageBucket: "healthio-sys.appspot.com",
  messagingSenderId: "499874464737",
  appId: "1:499874464737:web:ceb1649da3c5c4953488a0",
  measurementId: "G-P36Z39VJ9Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app, auth };