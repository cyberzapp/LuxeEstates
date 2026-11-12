// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDcGR3GFMsFLzvxv2YoJepy0H6AUUMHQwg",
    authDomain: "memory-2b328.firebaseapp.com",
    projectId: "memory-2b328",
    storageBucket: "memory-2b328.firebasestorage.app",
    messagingSenderId: "570254755150",
    appId: "1:570254755150:web:cb87583e3f8bac2e18ca1f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);