import React, { useState, useEffect } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

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
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getAllUsers`);
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
          is_verified: user.is_verified ? "Verified" : "Not Verified",
        }));


        setUsers(transformedUsers);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, []);


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
            <BaseDropdownMenu key={user.id} title={`${user.name} (ID: ${user.id})`}>
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
                <div className="mb-4">
                  <p className="font-semibold">Verification Status:</p>
                  <p>{user.is_verified}</p> {/* Add this line to show verification status */}
                </div>

              </div>
            </BaseDropdownMenu>
          ))}

      </div>
    </div>
  );
};

export default UserManagement;
