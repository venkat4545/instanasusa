// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh5dDwJe5vgtDY8B8J6tDJd356XdpiE6Q",
  authDomain: "instanasusa.firebaseapp.com",
  projectId: "instanasusa",
  storageBucket: "instanasusa.appspot.com",
  messagingSenderId: "989023450307",
  appId: "1:989023450307:web:153cb55031456bb9b41e76",
  measurementId: "G-PSBPEWT5PC"
};

// Initialize Firebase
const app  = !getApps().length ? initializeApp(firebaseConfig):getApp;

const db= getFirestore();
const storage= getStorage();


export {app,db,storage};
