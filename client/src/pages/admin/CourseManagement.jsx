import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import AdminCourseDropdown from "../../components/AdminCourseDropdown";

const CourseManagement = () => {

  // Sample data for courses (replace with your actual data source)
  const courses = [
    { name: 'Devops' },
    { name: 'Serverless' },
    { name: 'AWS' },
    { name: 'Azure' },
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
          label="Add Course"
          onClick={() => (window.location.href = "/admin/add-course")}
          color="gray" />

        {/* <AdminCourseDropdown title="Devops"/> */}

        {courses.map((faculty, index) => (
          <AdminCourseDropdown key={index} title={faculty.name} />
        ))}

      </div>
    </div>
  );
};

export default CourseManagement;
