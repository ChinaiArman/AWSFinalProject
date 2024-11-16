import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";

const CourseManagement = () => {

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
        label="Add Course"
        onClick={() => (window.location.href = "/admin/add-course")}
        color="gray" />


      </div>
    </div>
  );
};

export default CourseManagement;
