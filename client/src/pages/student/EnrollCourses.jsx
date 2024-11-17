//EnrollCourses.jsx
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
    // Update filtered courses based on search query
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/course/getAllCourses');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const courses = data.courses.map((course) => ({
          id: course.id,
          name: course.course_name,
          description: course.course_description,
          faculty: course.facultyName, // Extract facultyName from API response
          schedule: course.courseRuntimes.length
            ? course.courseRuntimes.map(runtime =>
              `${runtime.day_of_week || "N/A"} ${runtime.start_time} - ${runtime.end_time}`
            ).join(', ')
            : 'Schedule not available',
          room: `Room ${course.room_number}`,
          seat: `${course.seats_available} seats available out of ${course.total_seats}`,
        }));
        setCourses(courses); // Set courses with fetched data
        setFilteredCourses(courses); // Initialize filtered courses
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
        setFilteredCourses([]);
      }
    };

    fetchCourses();
  }, []); // Runs once when the component loads  

  ///////////////////////////////////////////////////////////////////////
  const studentId = 1;  //should delete this line
  const selectedCourseId = 2; //should delete this line

  const handleConfirm = async () => {
    setIsPopupOpen(false);
    if (selectedCourseId) {
      try {
        const response = await fetch(`http://localhost:5001/api/student/${studentId}/enroll/${selectedCourseId}`, {
          method: 'PUT',
        });
        if (!response.ok) {
          throw new Error(`Failed to enroll: ${response.statusText}`);
        }
        alert("Enrolled successfully!");
      } catch (error) {
        console.error("Error enrolling in course:", error);
        alert("Enrollment failed. Please try again.");
      }
    }
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
                  <strong>Faculty:</strong> {course.faculty}
                </p>
                <p className="text-gray-700">
                  <strong>Schedule:</strong> {course.schedule}
                </p>
                <p className="text-gray-700">
                  <strong>Room:</strong> {course.room}
                </p>
                <p className="text-gray-700">
                  <strong>Seat:</strong> {course.seat}
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
