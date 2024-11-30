import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar({ role }) {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [userType, setUserType] = useState(null);

  const userTypes = ["Student", "Faculty", "Admin"];

  // Determine the home route based on the role
  const getHomeRoute = () => {
    if (role === "student") return "/student/my-courses";
    if (role === "faculty") return "/faculty/my-courses";
    if (role === "admin") return "/admin/user-management";
    return "/"; // Default route if no role is provided
  };

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getUserBySession`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const role = data.user.role;
        const name = data.user.profile.first_name + " " + data.user.profile.last_name;
        setUserType(userTypes[role]);
        setName(name);
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch {
      console.error("Error fetching user profile");
    }
  }

  useEffect(() => {
    fetchUserProfile();
  })


  return (
    <>
      {/* Fixed Navbar */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between fixed top-0 left-0 w-full z-50 shadow-md">
        {/* Home Icon and Logo */}
        <div className="flex items-center">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate(getHomeRoute())}
          >
            <HomeIcon className="mr-2" />
          </div>
          <div className="text-lg font-bold">Logo</div>
        </div>

        {/* Profile Icon */}
        <span>
          <span className="mr-1 text-xs">You are logged in as {name} ({userType})</span>
          <span className="cursor-pointer"><AccountCircleIcon /></span>
        </span>
      </div>

      {/* Spacer for Navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
