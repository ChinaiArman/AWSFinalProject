// components/ConfirmationPopup.jsx
import React from "react";

const ConfirmationPopup = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null; // Do not render if the pop-up is closed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">{title || "Confirmation"}</h2>

        {/* Message */}
        <p className="text-gray-600 mt-2">{message || "Are you sure you want to proceed?"}</p>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
