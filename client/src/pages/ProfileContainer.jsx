import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile.jsx';
import { useNavigate } from "react-router-dom";
import BaseSidebar from "../components/BaseSidebar";
import Navbar from "../components/Navbar.jsx";

const ProfileContainer = ({ role }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sidebar menu items for admin
  const AdminSidebarItems = [
    {label: "User Management", path: "/admin/user-management", onClick: () => navigate("/admin/user-management")    },
    {label: "Course Management",path: "/admin/course-management",onClick: () => navigate("/admin/course-management"),},
  ];

  // Sidebar menu items for students
  const StudentSidebarItems = [
    { label: "My Courses", path: "/student/my-courses", onClick: () => navigate("/student/my-courses") },
    { label: "My Timetable", path: "/student/my-timetable", onClick: () => navigate("/student/my-timetable") },
    { label: "Waitlist", path: "/student/waitlist", onClick: () => navigate("/student/waitlist") },
    { label: "Enroll Course", path: "/student/enroll-courses", onClick: () => navigate("/student/enroll-courses") },
  ];

  // sidebar menu items for faculty
  const FacultySidebarItems = [
    { label: "My Courses", path: "/faculty/my-courses", onClick: () => navigate("/faculty/my-courses") },
    { label: "My Timetable", path: "/faculty/my-timetable", onClick: () => navigate("/faculty/my-timetable") },
    { label: "Time Availability", path: "/faculty/time-availability", onClick: () => navigate("/faculty/time-availability") },
  ];



  const renderNavbar = () => {
    switch (role) {
      case 'admin':
        return <Navbar role="admin" />;
      case 'faculty':
        return <Navbar role="faculty" />;
      case 'student':
        return <Navbar role="student" />;
      default:
        return null;
    }
  };

  const renderSideBar = () => {
    switch (role) {
      case 'admin':
        return <BaseSidebar items={AdminSidebarItems} />
      case 'faculty':
        return <BaseSidebar items={FacultySidebarItems} />
      case 'student':
        return <BaseSidebar items={StudentSidebarItems} />
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getUserBySession`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setUser(data.user);
        console.log(data.user)

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {renderSideBar()}

      <div className="flex-1 overflow-y-auto">

        {/*Nav bar */}
        {renderNavbar()}

        <Profile
          role={role}
          firstname={user.profile.first_name}
          lastname={user.profile.last_name}
          email={user.profile.email}
          phone={user.profile.phone_number}
        />
      </div>
    </div>
  );
};

export default ProfileContainer;
