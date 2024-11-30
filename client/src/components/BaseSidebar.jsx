import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";

function BaseSidebar({ dashboardName, items, children }) {
  const location = useLocation(); // Get the current route

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className="bg-gray-800 text-white w-64 h-screen fixed top-0 left-0 pt-16"
        style={{ paddingTop: "4rem" }} // Matches the height of the fixed navbar
      >
        <h1 className="text-lg font-bold p-4">{dashboardName}</h1>
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

      {/* Main Content */}
      <div className="flex-1 ml-64 pt-16">
        {children}
      </div>
    </div>
  );
}

export default BaseSidebar;
