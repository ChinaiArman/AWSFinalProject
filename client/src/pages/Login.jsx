import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationButton from "../components/buttons/AuthenticationButton";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent form from refreshing the page

        try {
            const response = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include", // Ensure cookies are sent for session handling
            });

            const data = await response.json();
            if (!response.ok) {
                setErrorMessage(data.error || "Login failed. Please try again.");
                return;
            }

            // Fetch user details from session
            const userResponse = await fetch(`${process.env.SERVER_URL}/api/user/getUserBySession`, {
                method: "GET",
                credentials: "include",
            });

            const userData = await userResponse.json();
            if (!userResponse.ok) {
                setErrorMessage(userData.error || "Failed to fetch user details.");
                return;
            }

            // Redirect based on user role
            const { role } = userData.user;
            if (role === 0) navigate("/student/my-courses");
            if (role === 1) navigate("/faculty/my-courses");
            if (role === 2) navigate("/admin/user-management");
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded shadow-md w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleLogin}>
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="border w-full p-2 mb-4 rounded"
                        required
                    />
                    <label className="block mb-2 text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="border w-full p-2 mb-4 rounded"
                        required
                    />
                    <AuthenticationButton label="Login" type="submit" />
                </form>
                {errorMessage && <p className="text-red-500 text-center mt-4">{errorMessage}</p>}
                <div className="mt-4 text-sm text-center">
                    <p>
                        Forgot password?{" "}
                        <a href="/password-setup" className="text-blue-500">
                            Reset Password
                        </a>
                    </p>
                    <p className="mt-2 text-gray-500">— OR —</p>
                    <p>
                        First time logging in?{" "}
                        <a href="/verification" className="text-blue-500">
                            Set Up Your Password
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
