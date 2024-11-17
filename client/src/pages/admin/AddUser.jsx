import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import Signup from "../../components/Signup";

const AddUser = () => {

  // Sidebar menu items
  const sidebarItems = [
    { label: "User Management", path: "/admin/user-management", onClick: () => (window.location.href = "/admin/user-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => (window.location.href = "/admin/course-management") },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto ">

        <Navbar role="admin" />

        <Signup />
      </div>
    </div>
  );
};

export default AddUser;
