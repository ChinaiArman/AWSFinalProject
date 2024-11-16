import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationButton from "../components/buttons/AuthenticationButton";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    phoneNumber: "",
    role: "0", // Default role is set to student
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("User registered successfully");
      } else {
        console.error("Error registering user", await response.json());
      }
    } catch (error) {
      console.error("Error registering user", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit}>
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
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
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
          <AuthenticationButton label="Sign Up" type="submit" />
        </form>
        <div className="mt-4 text-sm text-center">
          <p>
            Already a user?{" "}
            <Link to="/" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
