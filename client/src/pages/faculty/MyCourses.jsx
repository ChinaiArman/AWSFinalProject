import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import { useNavigate } from "react-router-dom";

function MyCourses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]); // State for courses
  const [facultyId, setFacultyId] = useState(null); // State for faculty ID
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const sidebarItems = [
    { label: "My Courses", path: "/faculty/my-courses", onClick: () => navigate("/faculty/my-courses") },
    { label: "My Timetable", path: "/faculty/my-timetable", onClick: () => navigate("/faculty/my-timetable") },
    { label: "Time Availability", path: "/faculty/time-availability", onClick: () => navigate("/faculty/time-availability") },
  ];

  // Fetch the facultyId from the user session
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getUserBySession`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setFacultyId(data.user.profile.id); // Set facultyId from user profile
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch courses when facultyId is available
  useEffect(() => {
    const fetchCourses = async () => {
      if (!facultyId) {
        return; // Wait until facultyId is available
      }

      try {
        setIsLoading(true); // Start loading
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/faculty/${facultyId}/courses`, {
          credentials: "include", // Include cookies in the request
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Transform API data to match the component's structure
        const transformedCourses = data.courses.map((course) => ({
          id: course.id,
          name: course.course_name,
          description: course.course_description,
          schedule: course.courseRuntimes.length
            ? course.courseRuntimes
                .map(
                  (runtime) =>
                    `${runtime.day_of_week || "Day not specified"} ${runtime.start_time} - ${runtime.end_time} @ ${runtime.location}`
                )
                .join(", ")
            : "No schedule available",
          room: `Room: ${course.room_number}`,
          seats: `${course.seats_available} available out of ${course.total_seats}`,
        }));

        setCourses(transformedCourses); // Update the courses state
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // Reset to empty on error
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchCourses();
  }, [facultyId]);

  return (
    <div className="flex h-screen">
      <BaseSidebar dashboardName="Faculty Dashboard" items={sidebarItems} />
      <div className="flex-1">
        <Navbar role="faculty" />
        <div className="p-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">My Courses</h1>
              {courses.length === 0 ? (
                <p>No courses found for this faculty member.</p>
              ) : (
                courses.map((course) => (
                  <BaseDropdownMenu key={course.id} title={course.name}>
                    <p className="text-gray-700">
                      <strong>Course Name:</strong> {course.name}
                    </p>
                    <p className="text-gray-700">
                      <strong>Description:</strong> {course.description}
                    </p>
                    <p className="text-gray-700">
                      <strong>Schedule:</strong> {course.schedule}
                    </p>
                  </BaseDropdownMenu>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
