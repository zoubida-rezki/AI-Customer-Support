// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAfmz9Ap-2Jrvgc0lD9AtEfJtTiyDM8fg",
  authDomain: "feedback-mechanism.firebaseapp.com",
  projectId: "feedback-mechanism",
  storageBucket: "feedback-mechanism.appspot.com",
  messagingSenderId: "534658931405",
  appId: "1:534658931405:web:6fca5f7301ef64183f2784",
  measurementId: "G-KVQQXY13ZQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export{firestore}