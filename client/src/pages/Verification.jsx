import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationButton from "../components/buttons/AuthenticationButton";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Verification() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // For email input
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    const firstDigitInput = document.getElementById("digit-0");
    if (firstDigitInput) {
      firstDigitInput.focus();
    }
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits
    const updatedCode = [...code];
    updatedCode[index] = value;

    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    } else if (!value && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }

    setCode(updatedCode);
  };

  const handleCompleteAccount = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(!isValidEmail);

    if (!isValidEmail) {
      toast.error("Please enter a valid email.");
      return;
    }

    const verificationCode = code.join(""); // Combine the code into a single string

    if (verificationCode.length !== 6) {
      toast.error("Please enter the 6-digit verification code.");
      return;
    }

    try {
      // Step 1: Verify the code
      const verifyResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: verificationCode }),
        }
      );

      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        toast.error(`Verification failed: ${errorData.error}`);
        return;
      }

      toast.success("Verification successful!");

      // Step 2: Request a new code
      const forgotPasswordResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/forgotPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!forgotPasswordResponse.ok) {
        toast.error("Failed to request a new code for password setup. Please try again.");
        return;
      }

      toast.success("A new verification code has been sent to your email for password setup.");

      // Step 3: Navigate to the password setup page
      navigate("/password-setup", { state: { isFirstTime: true, email } });
    } catch (error) {
      console.error("Error during account completion:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleRequestNewCode = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/forgotPassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        toast.success("A new verification code has been sent to your email.");
      } else {
        toast.error("Failed to request a new code. Please check your email.");
      }
    } catch (error) {
      console.error("Request new code error:", error);
      toast.error("An error occurred while requesting a new code. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover draggable />
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify</h1>
        <form>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`border w-full p-2 mb-4 rounded ${emailError ? "border-red-500" : ""}`}
            required
          />

          <label className="block mb-2 text-sm font-medium">Verification Code</label>
          <div className="flex justify-between mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className={`border w-12 h-12 text-center text-lg rounded`}
              />
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <AuthenticationButton
              label="Complete your account"
              onClick={handleCompleteAccount}
            />
            <AuthenticationButton
              label="Has your code expired? Request a new one"
              onClick={handleRequestNewCode}
              color="gray"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verification;
