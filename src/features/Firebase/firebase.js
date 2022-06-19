// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkCPdc9ESottu8gT3YxIfR2-0--1PKM38",
  authDomain: "stockmarkethub-3541f.firebaseapp.com",
  databaseURL: "https://stockmarkethub-3541f-default-rtdb.firebaseio.com",
  projectId: "stockmarkethub-3541f",
  storageBucket: "stockmarkethub-3541f.appspot.com",
  messagingSenderId: "209749739743",
  appId: "1:209749739743:web:ffbdfc56c146cfb426c16a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initialize Firebase Authentication
const auth = firebase.auth();

export {auth};
