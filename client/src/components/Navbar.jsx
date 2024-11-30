import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar({ role }) {
  const navigate = useNavigate();

  // Determine the home route based on the role
  const getHomeRoute = () => {
    if (role === "student") return "/student/my-courses";
    if (role === "faculty") return "/faculty/my-courses";
    if (role === "admin") return "/admin/user-management";
    return "/"; // Default route if no role is provided
  };

  // determine profile route based on role
  const getProfileRoute = () =>{
    if (role === "student") return "/student/profile";
    if (role === "faculty") return "/faculty/profile";
    if (role === "admin") return "/admin/profile";
    return "/";
  };
  
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
        <div className="cursor-pointer"
         onClick={() => navigate(getProfileRoute())}>
          <AccountCircleIcon />
        </div>
      </div>

      {/* Spacer for Navbar */}
      <div className="h-16"></div>
    </>
  );
}

export default Navbar;
