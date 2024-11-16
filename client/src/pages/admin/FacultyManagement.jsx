import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";

const FacultyManagement = () => {

  // Sample data for faculty (replace with your actual data source)
  const faculties = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Prof. Jane Smith' },
    { id: 3, name: 'Dr. Alice Johnson' },
    { id: 4, name: 'Prof. Bob Brown' },
    { id: 5, name: 'Dr. Charlie Davis' },
  ];

  //sidebar menu items
  const sidebarItems = [
    { label: "Faculty Management", path: "/admin/faculty-management", onClick: () => (window.location.href = "/admin/faculty-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => (window.location.href = "/admin/course-management") },
  ];


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />

        <AddButton
          label="Add Faculty"
          onClick={() => (window.location.href = "/admin/add-faculty")}
          color="gray" />

      </div>
    </div>
  );
};

export default FacultyManagement;
