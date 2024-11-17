import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationButton from "../components/buttons/AuthenticationButton";

function Verification() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // For email input
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [emailError, setEmailError] = useState(false);
  const [codeError, setCodeError] = useState(false);

  useEffect(() => {
    document.getElementById("digit-0").focus(); // Focus the first digit on load
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits
    const updatedCode = [...code];
    updatedCode[index] = value;

    if (value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`digit-${index - 1}`).focus();
    }

    setCode(updatedCode);
  };

  const handleCompleteAccount = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setEmailError(!isValidEmail);

    const verificationCode = code.join("");
    setCodeError(verificationCode.length !== 6);

    if (!isValidEmail || verificationCode.length !== 6) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      if (response.ok) {
        console.log("Verification successful");
        navigate("/password-setup", { state: { isFirstTime: true, email } });
      } else {
        const errorData = await response.json();
        alert(`Verification failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleRequestNewCode = async (e) => {
    e.preventDefault();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError(true);
      alert("Please enter a valid email.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert("A new verification code has been sent to your email.");
      } else {
        alert("Failed to request a new code. Please check your email.");
      }
    } catch (error) {
      console.error("Request new code error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
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
                className={`border w-12 h-12 text-center text-lg rounded ${
                  codeError && !digit ? "border-red-500" : ""
                }`}
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
