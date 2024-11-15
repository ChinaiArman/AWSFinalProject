import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';

const App = () => {
  return (
    <div>
      <nav>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;