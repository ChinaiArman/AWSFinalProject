import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form>
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
          <button className="w-full bg-blue-500 text-white py-2 rounded">
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          <p>
            Forgot password? <a href="#" className="text-blue-500">Reset</a>
          </p>
          <p>
            Need an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
