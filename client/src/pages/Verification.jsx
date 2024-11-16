import React, { useState } from "react";
import AuthenticationButton from "../components/AuthenticationButton";

function Verification() {
  const [email, setEmail] = useState(""); // Assuming this comes from Cognito or state
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits
    const updatedCode = [...code];
    updatedCode[index] = value;

    if (value && index < 5) {
      document.getElementById(`digit-${index + 1}`).focus();
    }

    setCode(updatedCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join(""); // Combine the 6 boxes into one string

    try {
      const response = await axios.post("/verify", {
        email, // Replace with dynamic email
        verificationCode,
      });
      console.log("Verification successful:", response.data);
    } catch (error) {
      console.error("Verification failed:", error.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Verify Your Account</h1>
        <p className="text-sm mb-4 text-center">
          Please enter the verification code we sent to your email.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`digit-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="border w-12 h-12 text-center text-lg rounded"
              />
            ))}
          </div>
          <AuthenticationButton label="Confirm Code" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Verification;
