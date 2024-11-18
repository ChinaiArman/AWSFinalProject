import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthenticationButton from "../components/buttons/AuthenticationButton";

function PasswordSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstTime = location.state?.isFirstTime || false;
  const email = location.state?.email || ""; // Email passed from Verification
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!code || code.length !== 6) {
      setError("Please enter a valid 6-digit verification code.");
      return;
    }
    if (!password || password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    try {
      // Step 1: Reset the password
      const resetPasswordResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/resetPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code, password }),
        }
      );

      if (!resetPasswordResponse.ok) {
        const errorData = await resetPasswordResponse.json();
        setError(errorData.error || "Error setting password.");
        return;
      }

      // Step 2: Call the completeVerification API
      console.log(email);
      const completeVerificationResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/completeVerification`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!completeVerificationResponse.ok) {
        const errorData = await completeVerificationResponse.json();
        setError(
          errorData.error || "Password reset successful, but verification failed."
        );
        return;
      }

      // Success: Navigate to login
      alert("Password set successfully. Your account is now verified. You can log in.");
      navigate("/");
    } catch (err) {
      console.error("Error during password setup:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isFirstTime ? "Complete Your Account" : "Reset Your Password"}
        </h1>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
          )}

          <label className="block mb-2 text-sm font-medium">Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter your 6-digit code"
            className="border w-full p-2 mb-4 rounded"
            maxLength="6"
          />

          <label className="block mb-2 text-sm font-medium">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your new password"
            className="border w-full p-2 mb-4 rounded"
          />

          <AuthenticationButton label="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default PasswordSetup;
