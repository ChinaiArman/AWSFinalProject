import React from "react";

function BaseSidebar({ items }) {
  return (
    <div className="bg-gray-800 text-white w-64 h-screen">
      <h1 className="text-lg font-bold p-4">Menu</h1>
      <ul>
        {items.map((item) => (
          <li
            key={item.label}
            className="p-4 hover:bg-gray-600 cursor-pointer"
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
