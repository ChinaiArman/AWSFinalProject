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

  // Fetch users from the API
  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/user/getAllUsers");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();

        // Transform API response into the desired format
        const transformedUsers = data.users.map((user) => ({
          id: user.id,
          name: user.profile
            ? `${user.profile.first_name} ${user.profile.last_name}`
            : "Unknown User",
          email: user.profile?.email || "N/A",
          phone: user.profile?.phone_number || "N/A",
          role:
            user.role === 0
              ? "Student"
              : user.role === 1
              ? "Faculty"
              : "Admin",
        }));

        setUsers(transformedUsers);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);

  // Function to delete a user
  const deleteUser = async (userId) => {
    try {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Open confirmation popup
  const openDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setIsPopupOpen(true);
  };

  // Close the confirmation popup
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
                  <p className="font-semibold">First and Last Name:</p>
                  <p>{user.name}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Email:</p>
                  <p>{user.email}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Phone:</p>
                  <p>{user.phone}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Role:</p>
                  <p>{user.role}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-12">
                  <DropdownButton
                    label="Delete User"
                    onClick={() => openDeleteConfirmation(user)}
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
        onConfirm={() => deleteUser(userToDelete?.id)}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default UserManagement;
