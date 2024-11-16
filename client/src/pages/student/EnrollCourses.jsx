import React, { useEffect, useState } from 'react';
import ConfirmationPopup from '../../components/ConfirmationPopup';
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import SearchBar from "../../components/SearchBar";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";

const EnrollCourses = () => {
  const [courses, setCourses] = useState([]); // State for all courses
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const sidebarItems = [
    { label: "My Courses", path: "/student/my-courses", onClick: () => (window.location.href = "/student/my-courses") },
    { label: "My Timetable", path: "/student/my-timetable", onClick: () => (window.location.href = "/student/my-timetable") },
    { label: "Waitlist", path: "/student/waitlist", onClick: () => (window.location.href = "/student/waitlist") },
    { label: "Enroll Course", path: "/student/enroll-courses", onClick: () => (window.location.href = "/student/enroll-courses") },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = [
          {
            id: 1,
            name: "Cloud Computing",
            description: "Introduction to cloud platforms",
            schedule: "Mon 9:30-10:20",
            room: "Room A102",
          },
          {
            id: 2,
            name: "DevOps Fundamentals",
            description: "CI/CD pipelines and infrastructure as code",
            schedule: "Tue 10:30-11:20",
            room: "Room B203",
          },
          {
            id: 3,
            name: "AI and Machine Learning",
            description: "Overview of AI and ML techniques",
            schedule: "Wed 1:00-2:20",
            room: "Room C304",
          },
        ];
        setCourses(data); // Set courses with provided data
        setFilteredCourses(data); // Initialize filtered courses
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
        setFilteredCourses([]);
      }
    };

    fetchCourses();
  }, []); // Runs once when the component loads

  useEffect(() => {
    // Update filtered courses based on search query
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  const handleConfirm = () => {
    setIsPopupOpen(false);
    alert("Enrolled successfully!"); // Replace with your action
  };

  const handleCancel = () => {
    setIsPopupOpen(false);
    alert("Enrollment canceled."); // Optional action
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar role="student" />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Enroll Courses</h1>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search for a course..."
            onSearch={setSearchQuery} // Update search query when user types
          />

          {/* Display Courses */}
          {filteredCourses.length === 0 ? (
            <p>No courses found.</p>
          ) : (
            filteredCourses.map((course) => (
              <BaseDropdownMenu key={course.id} title={course.name}>
                <p className="text-gray-700">
                  <strong>Description:</strong> {course.description}
                </p>
                <p className="text-gray-700">
                  <strong>Schedule:</strong> {course.schedule}
                </p>
                <p className="text-gray-700">
                  <strong>Room:</strong> {course.room}
                </p>
                <button
                  onClick={() => setIsPopupOpen(true)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Enroll
                </button>
              </BaseDropdownMenu>
            ))
          )}

          {/* Confirmation Popup */}
          <ConfirmationPopup
            isOpen={isPopupOpen}
            title="Enroll in Course"
            message="Are you sure you want to enroll in this course?"
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default EnrollCourses;
