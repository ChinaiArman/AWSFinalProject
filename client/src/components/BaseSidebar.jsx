import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BaseSidebar({ items }) {
  const location = useLocation(); // Get the current route
  const navigate = useNavigate(); // Navigation handler

  return (
    <div className="bg-gray-800 text-white w-64 h-screen">
      <h1 className="text-lg font-bold p-4">Menu</h1>
      <ul>
        {items.map((item) => (
          <li
            key={item.label}
            className={`p-4 cursor-pointer ${
              location.pathname === item.path ? "bg-blue-500 font-bold" : "hover:bg-gray-600"
            }`}
            onClick={() => navigate(item.path)} // Navigate to the correct path
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BaseSidebar;
