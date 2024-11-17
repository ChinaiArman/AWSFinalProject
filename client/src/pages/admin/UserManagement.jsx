import React, { useState, useEffect } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import DropdownButton from "../../components/buttons/DropdownButton";
import ConfirmationPopup from "../../components/ConfirmationPopup"; 

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [userToDelete, setUserToDelete] = useState(null); 

  // Sidebar menu items
  const sidebarItems = [
    {
      label: "User Management", 
      path: "/admin/user-management",
      onClick: () => (window.location.href = "/admin/user-management"),
    },
    {
      label: "Course Management",
      path: "/admin/course-management",
      onClick: () => (window.location.href = "/admin/course-management"),
    },
  ];

  // Mock data for users
  const mockData = [
    {
      id: 1,
      name: "Dr. John Doe",
      course: "Advanced Physics",
      email: "johndoe@example.com",
      role: "faculty"
    },
    {
      id: 2,
      name: "Prof. Jane Smith",
      course: "Creative Writing",
      email: "janesmith@example.com",
      role: "user"
    },
    {
      id: 3,
      name: "Dr. Alice Johnson",
      course: "Introduction to Chemistry",
      email: "alicejohnson@example.com",
      role: "admin"
    },
  ];

  useEffect(() => {
    // Set mock data as initial state
    setUsers(mockData);
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      // Send DELETE request to the server to delete the user
      // const response = await fetch(`/api/faculty/${facultyId}`, {
      //   method: "DELETE",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to fire faculty");
      // }

      // Remove faculty from local state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );

      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open confirmation popup and set the faculty to fire
  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setIsPopupOpen(true);
  };

  // Close the confirmation popup without firing
  const cancelDelete = () => {
    setIsPopupOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar role="admin" />

        <AddButton
          label="Add User"
          onClick={() => (window.location.href = "/admin/add-user")}
          color="gray"
        />

        {users.length > 0 &&
          users.map((user) => (
            <BaseDropdownMenu key={user.id} title={user.name}>
              <div className="px-6 py-3">
                <div className="mb-4">
                  <p className="font-semibold">Name:</p>
                  <p>{user.name}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Courses:</p>
                  <p>{user.course}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Email:</p>
                  <p>{user.email}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Role:</p>
                  <p>{user.role}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-12">
                
                  <DropdownButton
                    label="Delete User"
                    onClick={() => openDeleteConfirmation(user)} // Open confirmation popup
                    color="red"
                  />
                </div>
              </div>
            </BaseDropdownMenu>
          ))}
      </div>

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={isPopupOpen}
        title="Delete User"
        message={`Are you sure you want to delete ${userToDelete?.name}?`}
        onConfirm={() => deleteUser(userToDelete?.id)} // Confirm and fire the faculty
        onCancel={cancelDelete} // Cancel and close the popup
      />
    </div>
  );
};

export default UserManagement;
