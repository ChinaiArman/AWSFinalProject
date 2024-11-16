import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import SearchBar from "../../components/SearchBar";
import ConfirmationPopup from "../../components/ConfirmationPopup";

function MyCourses() {
  const [courses, setCourses] = useState([]); // Dynamic state for courses
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [courseToDrop, setCourseToDrop] = useState(null); // State to track which course is being dropped

  // Sidebar menu items for students
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
        setCourses(data); // Set courses with example data
        setFilteredCourses(data); // Initialize filtered courses
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // Fallback if fetching fails
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

  const handleDropClick = (course) => {
    setCourseToDrop(course);
    setIsPopupOpen(true);
  };

  const handleConfirmDrop = () => {
    const updatedCourses = courses.filter((course) => course.id !== courseToDrop.id);
    setCourses(updatedCourses);
    setFilteredCourses(updatedCourses);
    setIsPopupOpen(false);
    alert(`Dropped course: ${courseToDrop.name}`);
    setCourseToDrop(null);
  };

  const handleCancelDrop = () => {
    setIsPopupOpen(false);
    setCourseToDrop(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar role="faculty" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Courses</h1>

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
                  <strong>Course Name:</strong> {course.name}
                </p>
                <p className="text-gray-700">
                  <strong>Course Description:</strong> {course.description}
                </p>
                <p className="text-gray-700">
                  <strong>Time:</strong> {course.schedule}
                </p>
                <p className="text-gray-700">
                  <strong>Room:</strong> {course.room}
                </p>
                <button
                  onClick={() => handleDropClick(course)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Drop
                </button>
              </BaseDropdownMenu>
            ))
          )}

          {/* Confirmation Popup */}
          <ConfirmationPopup
            isOpen={isPopupOpen}
            title="Drop Course"
            message={`Are you sure you want to drop the course "${courseToDrop?.name}"? This action cannot be undone.`}
            onConfirm={handleConfirmDrop}
            onCancel={handleCancelDrop}
          />
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
