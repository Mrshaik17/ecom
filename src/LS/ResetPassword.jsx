import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "./firebase.js";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = async () => {
    if (!email) {
      setMessage("❌ Please enter your email.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("✅ Password reset link sent to your email.");
    } catch (error) {
      console.error("Reset error:", error.code);
      setMessage("❌ Failed to send reset link.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Password
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 mb-4 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
        >
          Send Reset Link
        </button>

        {/* Back to Login */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Remembered your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 font-medium hover:underline"
          >
            Go back to Login
          </button>
        </p>

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
