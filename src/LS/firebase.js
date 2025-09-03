// src/LS/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAZLpXKhIvrinwK2gCQNinO9QVCI05W_ls",
  authDomain: "e-com17.firebaseapp.com",
  projectId: "e-com17",
  storageBucket: "e-com17.appspot.com", // ✅ fixed (was wrong in your file)
  messagingSenderId: "596680887799",
  appId: "1:596680887799:web:ce647e6886c92777fa32f2",
  measurementId: "G-1SBGL7XW5P",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Firebase services
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ Ensure persistence (user stays logged in even after refresh/close tab)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Persistence error:", error);
});

export { auth, googleProvider, db };
