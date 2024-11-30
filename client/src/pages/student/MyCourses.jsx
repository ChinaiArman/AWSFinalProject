import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import SearchBar from "../../components/SearchBar";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // State for all courses
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [filteredCourses, setFilteredCourses] = useState([]); // State for filtered courses
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility
  const [courseToDrop, setCourseToDrop] = useState(null); // State to track which course is being dropped
  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [studentId, setStudentId] = useState(null); // State for student ID

  // Sidebar menu items for students
  const sidebarItems = [
    { label: "My Courses", path: "/student/my-courses", onClick: () => navigate("/student/my-courses") },
    { label: "My Timetable", path: "/student/my-timetable", onClick: () => navigate("/student/my-timetable") },
    { label: "Waitlist", path: "/student/waitlist", onClick: () => navigate("/student/waitlist") },
    { label: "Enroll Course", path: "/student/enroll-courses", onClick: () => navigate("/student/enroll-courses") },
  ];

  // Fetch student ID from session
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getUserBySession`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          const studentIdFromProfile = data.user.profile.id; // Assuming this is the studentId
          setStudentId(studentIdFromProfile);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch enrolled courses for the student
  useEffect(() => {
    if (!studentId) {
      console.log("Student ID not available yet.");
      return;
    }

    const fetchCourses = async () => {
      setIsLoading(true); // Show loading indicator
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/student/${studentId}/courses`, {
          credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch courses: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debugging: Log the API response

        // Transform the response data into the required structure
        const formattedCourses = data.courses.map((course) => ({
          id: course.id,
          name: course.course_name,
          description: course.course_description,
          faculty: course.facultyName,
          schedule: course.courseRuntimes.length
            ? course.courseRuntimes.map(runtime =>
              `${runtime.day_of_week || "N/A"} ${runtime.start_time} - ${runtime.end_time}`
            ).join(', ')
            : 'Schedule not available',
          room: `Room ${course.room_number}`,
          enrollmentDate: course.enrollment?.[0]?.enrollment_date || "N/A",
          status: course.enrollment?.[0]?.status || "N/A",
        }));

        setCourses(formattedCourses); // Update the courses state
        setFilteredCourses(formattedCourses); // Update the filtered courses state
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
        setFilteredCourses([]);
      } finally {
        setIsLoading(false); // Hide loading indicator
      }
    };

    fetchCourses();
  }, [studentId]); // Trigger when studentId changes

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

    setIsLoading(true); // Show loading indicator
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/student/${studentId}/drop/${courseToDrop.id}`,
        {
          method: "DELETE",
          credentials: "include", // Include cookies in the request
        }
      );

      const data = await response.json();
      console.log("Drop Course Response:", data); // Log the API response

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! Status: ${response.status}`);
      }

      // Remove the dropped course from the list
      const updatedCourses = courses.filter((course) => course.id !== courseToDrop.id);
      setCourses(updatedCourses);
      setFilteredCourses(updatedCourses);
      alert(`Dropped course: ${courseToDrop.name}`);
    } catch (error) {
      console.error("Error dropping course:", error);
      alert("Failed to drop the course. Please try again.");
    } finally {
      setCourseToDrop(null);
      setIsLoading(false); // Hide loading indicator
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
      <BaseSidebar dashboardName="Student Dashboard" items={sidebarItems} />

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
