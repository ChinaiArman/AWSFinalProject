import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import DropdownButton from "../../components/buttons/DropdownButton";

const AddFaculty = () => {


  // Sample category options for the dropdown
  const categoryOptions = [
    { label: "Science", value: "science" },
    { label: "Arts", value: "arts" },
    { label: "Technology", value: "technology" },
  ];

  // Sidebar menu items
  const sidebarItems = [
    { label: "Faculty Management", path: "/admin/faculty-management", onClick: () => (window.location.href = "/admin/faculty-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => (window.location.href = "/admin/course-management") },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto ">

        <Navbar />
        <h1 className="text-2xl font-bold text-center mb-6">Add a new faculty member:</h1>
        <TextField
          label="First Name:"
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
        <TextField
          label="Last Name:"
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
        <TextField
          label="Email:"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter instructor email address"
        />
        <TextField
          label="Phone Number:"
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter instructor phone number"
        />

        <div className="mt-auto flex justify-center gap-10 mb-6">
          <DropdownButton
            label="Cancel"
            onClick={() => console.log("Button clicked! Placeholder action.")}
            color="gray"
          />

          <DropdownButton
            label="Save"
            onClick={() => console.log("Button clicked! Placeholder action.")}
            color="green"
          />
        </div>


      </div>
    </div>
  );
};

export default AddFaculty;
