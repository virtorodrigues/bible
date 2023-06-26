// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRWZ71jFmGHEFWiRQcDXNGq8sBUHTZ6bQ",
  authDomain: "bible-4ce9d.firebaseapp.com",
  projectId: "bible-4ce9d",
  storageBucket: "bible-4ce9d.appspot.com",
  messagingSenderId: "547866123488",
  appId: "1:547866123488:web:13e5fa9addbbb1e8590485",
  measurementId: "G-8MTFSJT420"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);