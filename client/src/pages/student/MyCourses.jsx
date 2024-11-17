//MyCourses.jsx
import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import SearchBar from "../../components/SearchBar";
import ConfirmationPopup from "../../components/ConfirmationPopup";

function MyCourses() {
  const [courses, setCourses] = useState([]); // State for all courses
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [courseToDrop, setCourseToDrop] = useState(null); // State to track which course is being dropped
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  // Sidebar menu items for students
  const sidebarItems = [
    { label: "My Courses", path: "/student/my-courses", onClick: () => (window.location.href = "/student/my-courses") },
    { label: "My Timetable", path: "/student/my-timetable", onClick: () => (window.location.href = "/student/my-timetable") },
    { label: "Waitlist", path: "/student/waitlist", onClick: () => (window.location.href = "/student/waitlist") },
    { label: "Enroll Course", path: "/student/enroll-courses", onClick: () => (window.location.href = "/student/enroll-courses") },
  ];

  // Fetch enrolled courses for the student
  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5001/api/student/1/courses`);
        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("API Response:", data); // Debugging: Log the API response
        const formattedCourses = data.courses.map((course) => ({
          id: course.id,
          name: course.course_name,
          description: course.course_description,
          faculty: course.facultyName,
          schedule: course.courseRuntimes.length
            ? course.courseRuntimes.map(runtime => `${runtime.day} ${runtime.startTime}-${runtime.endTime}`).join(', ')
            : 'Schedule not available', // Format courseRuntimes or show default message
          room: `Room ${course.room_number}`,
          enrollmentDate: course.enrollment?.[0]?.enrollment_date || "N/A",
          status: course.enrollment?.[0]?.status || "N/A",
        }));
        setCourses(formattedCourses); // Set courses with formatted data
        setFilteredCourses(formattedCourses); // Initialize filtered courses
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // Runs once when the component loads

  // Filter courses based on the search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCourses(courses); // Show all courses if search query is empty
    } else {
      const filtered = courses.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, courses]);

  // Handle drop button click
  const handleDropClick = (course) => {
    setCourseToDrop(course);
    setIsPopupOpen(true);
  };

  // Confirm dropping the course
  const handleConfirmDrop = async () => {
    setIsPopupOpen(false);
    if (!courseToDrop) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5001/api/student/1/drop/${courseToDrop.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to drop course: ${response.statusText}`);
      }
      const updatedCourses = courses.filter((course) => course.id !== courseToDrop.id);
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
      alert(`Dropped course: ${courseToDrop.name}`);
    } catch (error) {
      console.error("Error dropping course:", error);
      alert("Failed to drop the course. Please try again.");
    } finally {
      setCourseToDrop(null);
      setIsLoading(false);
    }
  };

  // Cancel dropping the course
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
        <Navbar role="student" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Courses</h1>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search for a course..."
            onSearch={setSearchQuery} // Update search query when user types
          />

          {/* Display Courses */}
          {isLoading ? (
            <p>Loading courses...</p>
          ) : filteredCourses.length === 0 ? (
            <p>No courses found.</p>
          ) : (
            filteredCourses.map((course) => (
              <BaseDropdownMenu key={course.id} title={course.name}>
                <p className="text-gray-700">
                  <strong>Description:</strong> {course.description}
                </p>
                <p className="text-gray-700">
                  <strong>Faculty:</strong> {course.faculty}
                </p>
                <p className="text-gray-700">
                  <strong>Schedule:</strong> {course.schedule}
                </p>
                <p className="text-gray-700">
                  <strong>Room:</strong> {course.room}
                </p>
                <p className="text-gray-700">
                  <strong>Enrollment Date:</strong> {course.enrollmentDate}
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
