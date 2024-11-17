import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import Signup from "../../components/Signup";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  // Sidebar menu items
  const sidebarItems = [
    { label: "User Management", path: "/admin/user-management", onClick: () => navigate("/admin/user-management"),},
    { label: "Course Management", path: "/admin/course-management", onClick: () => navigate("/admin/course-management"), },
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
