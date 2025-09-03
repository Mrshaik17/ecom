// src/Auth.jsx
import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

// Your Firebase config (replace with yours)
const firebaseConfig = {
  apiKey: "AIzaSyAZLpXKhIvrinwK2gCQNinO9QVCI05W_ls",
  authDomain: "e-com17.firebaseapp.com",
  projectId: "e-com17",
  storageBucket: "e-com17.firebasestorage.app",
  messagingSenderId: "596680887799",
  appId: "1:596680887799:web:ce647e6886c92777fa32f2",
  measurementId: "G-1SBGL7XW5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Email/Password Sign In
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Successfully Logged In!");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  // Email/Password Sign Up
  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("✅ Account Created Successfully!");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("✅ Signed In with Google!");
    } catch (error) {
      setMessage("❌ " + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-3 border rounded-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 border rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit Button */}
        <button
          onClick={isLogin ? handleSignIn : handleSignUp}
          className="w-full bg-green-500 text-white p-3 rounded-xl font-semibold hover:bg-green-600 transition"
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </button>

        {/* Google Auth */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 border p-3 rounded-xl hover:bg-gray-100"
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            className="w-5 h-5"
          />
          {isLogin ? "Sign In with Google" : "Sign Up with Google"}
        </button>

        {/* Switch Auth Mode */}
        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer font-semibold"
          >
            {isLogin ? "Create one now" : "Login here"}
          </span>
        </p>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
