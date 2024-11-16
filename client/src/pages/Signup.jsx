import React from "react";
import { Link } from "react-router-dom";
import AuthenticationButton from "../components/buttons/AuthenticationButton";

function Signup() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
        <form>
          <label className="block mb-2 text-sm font-medium">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            className="border w-full p-2 mb-4 rounded"
          />
          <label className="block mb-2 text-sm font-medium">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            className="border w-full p-2 mb-4 rounded"
          />
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 mb-4 rounded"
          />
          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="border w-full p-2 mb-4 rounded"
          />
          <label className="block mb-2 text-sm font-medium">Date of Birth</label>
          <input type="date" className="border w-full p-2 mb-4 rounded" />
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            placeholder="Phone Number"
            className="border w-full p-2 mb-4 rounded"
          />
          <AuthenticationButton label="Sign Up" type="submit" />
        </form>
        <div className="mt-4 text-sm text-center">
          <p>
            Already a user?{" "}
            {/* Change the Link here */}
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
