import React from "react";
import { useLocation } from "react-router-dom";

function BaseSidebar({ items }) {
  const location = useLocation(); // Get the current route

  return (
    <div className="bg-gray-800 text-white w-64 h-screen">
      <h1 className="text-lg font-bold p-4">Menu</h1>
      <ul>
        {items.map((item) => (
          <li
            key={item.label}
            className={`p-4 cursor-pointer ${
              location.pathname === item.path
                ? "bg-gray-600 font-bold"
                : "hover:bg-gray-600"
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BaseSidebar;
