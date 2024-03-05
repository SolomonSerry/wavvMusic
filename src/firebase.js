// // Import the functions you need from the SDKs you need
// import firebase from "firebase";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAIdH2u0XEBwvTmkM48-Mg5PFPcIHznGvw",
//     authDomain: "music-app-7e48c.firebaseapp.com",
//     projectId: "music-app-7e48c",
//     storageBucket: "music-app-7e48c.appspot.com",
//     messagingSenderId: "382869183296",
//     appId: "1:382869183296:web:023ab5563dde725d04f8a5"
// };

// // Initialize Firebase
//  const fire = firebase.initializeApp(firebaseConfig);

//  export default fire

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "music-app-7e48c.firebaseapp.com",
    databaseURL: "https://music-app-7e48c-default-rtdb.firebaseio.com",
    projectId: "music-app-7e48c",
    storageBucket: "music-app-7e48c.appspot.com",
    messagingSenderId: "382869183296",
    appId: "1:382869183296:web:023ab5563dde725d04f8a5"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export const db = getDatabase(fire);





