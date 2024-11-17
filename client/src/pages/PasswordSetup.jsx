import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthenticationButton from '../components/buttons/AuthenticationButton';

function PasswordSetup() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstTime = location.state?.isFirstTime || false;
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password }),
      });
      if (response.ok) {
        alert('Password set successfully. You can now log in.');
        navigate('/');
      } else {
        alert('Error setting password.');
      }
    } catch (error) {
      console.error('Error during password setup:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {isFirstTime ? 'Complete Your Account' : 'Reset Your Password'}
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border w-full p-2 mb-4 rounded"
          />
          <label className="block mb-2 text-sm font-medium">Verification Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code"
            className="border w-full p-2 mb-4 rounded"
          />
          <label className="block mb-2 text-sm font-medium">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New Password"
            className="border w-full p-2 mb-4 rounded"
          />
          <AuthenticationButton label="Submit" type="submit" />
        </form>
      </div>
    </div>
  );
}

export default PasswordSetup;
