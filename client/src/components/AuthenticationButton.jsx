import React from "react";

function AuthenticationButton({ label, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded w-full"
    >
      {label}
    </button>
  );
}

export default AuthenticationButton;
