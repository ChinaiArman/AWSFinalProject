import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const BaseDropdownMenu = ({ title = "Dropdown Title" }) => {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => {
    setOpen(!open);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden ml-10 mr-10 mt-4 mb-4">
      {/* Header */}
      <div
        className="flex justify-between items-center px-6 py-3 bg-gray-100 cursor-pointer hover:bg-gray-200"
        onClick={toggleDropdown}
      >
        <span className="font-bold text-gray-800">{title}</span>
        {open ? (
          <ExpandLessIcon className="h-5 w-5 text-gray-600" />
        ) : (
          <ExpandMoreIcon className="h-5 w-5 text-gray-600" />
        )}
      </div>

      {/* Dropdown Content */}
      {open && (
        <div className="px-6 py-3 bg-white">
          {/* Placeholder for dropdown content */}
          <p className="text-gray-700 text-md">
            Example text
          </p>
        </div>
      )}
    </div>
  );
};

export default BaseDropdownMenu;
