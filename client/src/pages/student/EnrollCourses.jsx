import React, { useState } from 'react';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";

const EnrollCourses = () => {
  // Sidebar menu items for students
  const sidebarItems = [
    { label: "My Courses", path: "/student/my-courses", onClick: () => (window.location.href = "/student/my-courses") },
    { label: "My Timetable", path: "/student/my-timetable", onClick: () => (window.location.href = "/student/my-timetable") },
    { label: "Waitlist", path: "/student/waitlist", onClick: () => (window.location.href = "/student/waitlist") },
    { label: "Enroll Course", path: "/student/enroll-courses", onClick: () => (window.location.href = "/student/enroll-courses") },
  ];

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
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar role="student" />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Enroll Courses</h1>
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
      </div>
    </div>
  );
};

export default EnrollCourses;
