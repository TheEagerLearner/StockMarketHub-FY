// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";



// app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyBsyEekp9pb_G1qJ2EsPdOyQlIJJrjD-QY",
  authDomain: "stock-market-hub.firebaseapp.com",
  projectId: "stock-market-hub",
  storageBucket: "stock-market-hub.appspot.com",
  messagingSenderId: "291013685856",
  appId: "1:291013685856:web:22d1f7612801ff0cf80905",
  measurementId: "G-W9645C62DK",
  databaseURL:"https://stock-market-hub-default-rtdb.firebaseio.com/"

};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Initialize Firebase Authentication
const auth = firebase.auth();

//Initialize Firebase Database
const database = firebase.database();


export {auth, database};
