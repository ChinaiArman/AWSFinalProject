import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationButton from "../components/AuthenticationButton";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login successful");
    navigate("/faculty/my-courses"); // Redirect to the faculty dashboard
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
        <form onSubmit={handleLogin}>
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
          <AuthenticationButton label="Login" type="submit" />
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
