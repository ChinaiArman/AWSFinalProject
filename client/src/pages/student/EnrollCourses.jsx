import React, { useState } from 'react';
import ConfirmationPopup from '../../components/ConfirmationPopup';

const EnrollCourses = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleConfirm = () => {
    setIsPopupOpen(false);
    alert("Confirmed!"); // Replace with your action
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    alert("Cancelled!"); // Optional action
  };

  return (
    <div className="p-6">
      <button
        onClick={() => setIsPopupOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Open Confirmation
      </button>

      <ConfirmationPopup
        isOpen={isPopupOpen}
        title="Delete Item"
        message="(testing) Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};


export default EnrollCourses;
