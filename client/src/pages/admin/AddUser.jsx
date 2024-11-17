import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import DropdownButton from "../../components/buttons/DropdownButton";

const AddUser = () => {
  // State variables to store form data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 
  // Sidebar menu items
  const sidebarItems = [
    { label: "User Management", path: "/admin/user-management", onClick: () => (window.location.href = "/admin/user-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => (window.location.href = "/admin/course-management") },
  ];

  // Handle form submission
  const handleSave = async () => {
    const facultyData = {
      firstName,
      lastName,
      email,
      phoneNumber
    };

    try {
      // replace with api
      const response = await fetch("/api/faculty", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(facultyData),
      });

      if (!response.ok) {
        throw new Error("Failed to save faculty data");
      }

      // reset form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");

    } catch (error) {
      console.error("Error saving faculty data:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto ">

        <Navbar role="admin" />
        <h1 className="text-2xl font-bold text-center mb-6">Add a new faculty member:</h1>

        <TextField
          label="First Name:"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Enter first name"
        />
        <TextField
          label="Last Name:"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter last name"
        />
        <TextField
          label="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter instructor email address"
        />
        <TextField
          label="Phone Number:"
          value={phoneNumber}
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
            onClick={handleSave} 
            color="green"
          />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
