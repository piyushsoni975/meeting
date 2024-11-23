// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "meetup-5c06c.firebaseapp.com",
  projectId: "meetup-5c06c",
  storageBucket: "meetup-5c06c.firebasestorage.app",
  messagingSenderId: "233658349692",
  appId: "1:233658349692:web:75107422f92269321df1f9",
  measurementId: "G-FP6WKB8LKZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
