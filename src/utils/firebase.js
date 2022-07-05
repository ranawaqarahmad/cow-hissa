// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyDnLwAkFPcZeycjH9j0oTXsfY6ICYITNGo",
  authDomain: "hissa-72c27.firebaseapp.com",
  projectId: "hissa-72c27",
  storageBucket: "hissa-72c27.appspot.com",
  messagingSenderId: "586424237388",
  appId: "1:586424237388:web:17f3e10711270f095ce3e9"
  // apiKey: "AIzaSyAug3H3tYIDsimALHfHE7HOyFishrQzIAk",
  // authDomain: "cow-hissa.firebaseapp.com",
  // databaseURL: "https://cow-hissa-default-rtdb.firebaseio.com",
  // projectId: "cow-hissa",
  // storageBucket: "cow-hissa.appspot.com",
  // messagingSenderId: "334415757006",
  // appId: "1:334415757006:web:0d5ea452e878994baa1a9f",
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const db = getFirestore(firebaseApp);
