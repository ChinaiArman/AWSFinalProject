import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import AdminFacultyDropdown from "../../components/AdminFacultyDropdown";

const FacultyManagement = () => {

  // Sample data for faculty (replace with your actual data source)
  const faculties = [
    { name: 'Dr. John Doe' },
    { name: 'Prof. Jane Smith' },
    { name: 'Dr. Alice Johnson' },
    { name: 'Prof. Bob Brown' },
    { name: 'Dr. Charlie Davis' },
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
        <Navbar role="admin" />

        <AddButton
          label="Add Faculty"
          onClick={() => (window.location.href = "/admin/add-faculty")}
          color="gray" />

        {/* <AdminFacultyDropdown title="Santa Claus" /> */}

        {faculties.map((faculty, index) => (
          <AdminFacultyDropdown key={index} title={faculty.name} />
        ))}

      </div>
    </div>
  );
};

export default FacultyManagement;
