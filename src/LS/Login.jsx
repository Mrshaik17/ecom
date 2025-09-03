import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

// Firebase imports
import { auth, googleProvider } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Custom Error Messages
  const getErrorMessage = (code) => {
    switch (code) {
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password.";
      case "auth/email-already-in-use":
        return "Email already in use.";
      case "auth/weak-password":
        return "Weak password, must be at least 6 characters.";
      default:
        return "Something went wrong. Please try again.";
    }
  };

  // 🔑 Sign In (Email/Password)
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("✅ Successfully Logged In!");
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.code);
      setMessage("❌ " + getErrorMessage(error.code));
    }
  };

  // 🔑 Sign Up (Email/Password)
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("✅ Account Created Successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Signup error:", error.code);
      setMessage("❌ " + getErrorMessage(error.code));
    }
  };

  // 🔑 Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setMessage("✅ Signed In with Google!");
      navigate("/home");
    } catch (error) {
      console.error("Google error:", error.code);
      setMessage("❌ " + getErrorMessage(error.code));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          {isLogin ? (
            // ================= LOGIN FORM =================
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Welcome Back
              </h2>

              {/* Email Input */}
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input */}
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Sign In Button */}
              <button
                onClick={handleLogin}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-sm text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Google Sign In */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                <FcGoogle size={22} />
                <span className="text-sm font-medium text-gray-700">
                  Continue With Google
                </span>
              </button>

              {/* Switch to Signup */}
              <p className="text-center text-sm mt-6 text-gray-600">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-500 font-medium hover:underline"
                >
                  Create one now
                </button>
              </p>
            </motion.div>
          ) : (
            // ================= SIGNUP FORM =================
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                Create Account
              </h2>

              {/* Email Input */}
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input */}
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Confirm Password Input */}
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* Sign Up Button */}
              <button
                onClick={handleSignup}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
              >
                Sign Up
              </button>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-gray-300" />
                <span className="px-3 text-sm text-gray-500">or</span>
                <hr className="flex-grow border-gray-300" />
              </div>

              {/* Google Sign Up */}
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 border py-3 rounded-lg hover:bg-gray-100 transition-all duration-300"
              >
                <FcGoogle size={22} />
                <span className="text-sm font-medium text-gray-700">
                  Continue With Google
                </span>
              </button>

              {/* Switch to Login */}
              <p className="text-center text-sm mt-6 text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-500 font-medium hover:underline"
                >
                  Sign in
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Show Message */}
        {message && (
          <p
            className={`mt-4 text-center text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
