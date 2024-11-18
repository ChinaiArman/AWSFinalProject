import React, { useState } from "react";
import AuthenticationButton from "./buttons/AuthenticationButton";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: "",
    role: 0, 
  });

  const [successMessage, setSuccessMessage] = useState(""); 

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "role") {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (response.ok) {
        setSuccessMessage("User registered successfully!"); // Set success message
        setFormData({ // Clear the form
          firstName: "",
          lastName: "",
          email: "",
          dateOfBirth: "",
          phoneNumber: "",
          role: 0,
        });
      } else {
        console.error("Error registering user", await response.json());
        setSuccessMessage(""); 
      }
    } catch (error) {
      console.error("Error registering user", error);
      setSuccessMessage("Unable to register user"); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign up a new user</h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border w-full p-2 mb-4 rounded"
            required
          >
            <option value="0">Student</option>
            <option value="1">Faculty</option>
            <option value="2">Admin</option>
          </select>
          <label className="block mb-2 text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border w-full p-2 mb-4 rounded"
            required
          />
          <label className="block mb-2 text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border w-full p-2 mb-4 rounded"
            required
          />
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border w-full p-2 mb-4 rounded"
            required
          />
          <label className="block mb-2 text-sm font-medium">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border w-full p-2 mb-4 rounded"
            required
          />
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            className="border w-full p-2 mb-4 rounded"
            required
          />
          <AuthenticationButton label="Sign Up" type="submit" />
        </form>

        {/* Success message */}
        {successMessage && (
          <p className="mt-4 text-green-500 text-center">{successMessage}</p>
        )}
      </div>
    </div>
  );
}

export default Signup;
