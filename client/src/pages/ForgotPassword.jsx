import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationButton from "../components/buttons/AuthenticationButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      // Call forgotPassword API to request a verification code
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to request a verification code.");
        return;
      }

      toast.success("A verification code has been sent to your email.");
      // Redirect to Reset Password Page, passing the email
      navigate("/password-setup", { state: { email, isFirstTime: false } });
    } catch (error) {
      console.error("Error during forgot password process:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover draggable />
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Forgot Password</h1>
        <form onSubmit={handleForgotPassword}>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="border w-full p-2 mb-4 rounded"
            required
          />
          <AuthenticationButton label={isLoading ? "Sending..." : "Request Verification Code"} type="submit" disabled={isLoading} />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
