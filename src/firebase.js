// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXNa9L8J8PqTswVhpiaY4YpA7P-pgW6p0",
  authDomain: "course-wise.firebaseapp.com",
  projectId: "course-wise",
  storageBucket: "course-wise.appspot.com",
  messagingSenderId: "790623128485",
  appId: "1:790623128485:web:dcc3e56e6d56726c6bb64c",
  measurementId: "G-7ETKC8NLKE",
};

firebase.initializeApp(firebaseConfig);
export default firebase;
