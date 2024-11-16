import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
      {/* Home Icon */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/faculty/my-courses")}
      >
        <HomeIcon className="mr-2" />
        {/* No "Home" text, just the icon */}
      </div>

      {/* Logo */}
      <div className="text-lg font-bold flex items-center">
        {/* Replace this placeholder text with the actual logo or an image */}
        <span>Logo</span>
      </div>

      {/* Profile Icon */}
      <div className="cursor-pointer">
        <AccountCircleIcon />
      </div>
    </div>
  );
}

export default Navbar;
