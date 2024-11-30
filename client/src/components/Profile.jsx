import React from 'react';
import DropdownButton from "./buttons/DropdownButton"
import { useNavigate } from 'react-router-dom';

const Profile = ({ role, firstname, lastname, email, phone }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to the login page or home after successful logout
        navigate("/");
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

   // Map role to the corresponding image URL
   const roleImageMap = {
    admin: 'https://comp4968-frontend-assets.s3.us-west-2.amazonaws.com/admin.png',
    faculty: 'https://comp4968-frontend-assets.s3.us-west-2.amazonaws.com/faculty.png',
    student: 'https://comp4968-frontend-assets.s3.us-west-2.amazonaws.com/student.png',
  };
  const roleImage = roleImageMap[role] || '';

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Profile</h1>

      {roleImage && (
        <div className="flex justify-center mb-4">
          <img
            src={roleImage}
            alt={`${role} profile`}
            className="w-28"
          />
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center">
          <strong className="w-32 text-gray-700">First Name:</strong>
          <span className="text-gray-900">{firstname}</span>
        </div>
        <div className="flex items-center">
          <strong className="w-32 text-gray-700">Last Name:</strong>
          <span className="text-gray-900">{lastname}</span>
        </div>
        <div className="flex items-center">
          <strong className="w-32 text-gray-700">Email:</strong>
          <span className="text-gray-900">{email}</span>
        </div>
        <div className="flex items-center">
          <strong className="w-32 text-gray-700">Phone:</strong>
          <span className="text-gray-900">{phone}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <DropdownButton
          label="Logout"
          onClick={handleLogout}
          color="black"
        />
      </div>
    </div>
  );
};

export default Profile;
