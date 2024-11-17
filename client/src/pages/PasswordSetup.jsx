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
      const response = await fetch("http://localhost:5001/api/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password }),
      });

      if (response.ok) {
        alert("Password set successfully. You can now log in.");
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error setting password.");
      }
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
