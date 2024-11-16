import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
      {/* Home Icon and Logo */}
      <div className="flex items-center">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/faculty/my-courses")}
        >
          <HomeIcon className="mr-2" />
        </div>
        <div className="text-lg font-bold">Logo</div>
      </div>

      {/* Profile Icon */}
      <div className="cursor-pointer">
        <AccountCircleIcon />
      </div>
    </div>
  );
}

export default Navbar;
