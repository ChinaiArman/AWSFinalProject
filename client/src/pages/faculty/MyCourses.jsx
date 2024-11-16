import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";

function MyCourses() {
  const [courses, setCourses] = useState([]); // Dynamic state for courses
  const sidebarItems = [
    {
      label: "My Courses",
      path: "/faculty/my-courses",
      onClick: () => (window.location.href = "/faculty/my-courses"),
    },
    {
      label: "My Timetable",
      path: "/faculty/my-timetable",
      onClick: () => (window.location.href = "/faculty/my-timetable"),
    },
    {
      label: "Time Availability",
      path: "/faculty/time-availability",
      onClick: () => (window.location.href = "/faculty/time-availability"),
    },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // I'm gonna replace this URL with our backend API endpoint in the future
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
        ];
        setCourses(data); // Set courses with example data
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]); // Fallback if fetching fails
      }
    };

    fetchCourses();
  }, []); // Runs once when the component loads

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar role="faculty" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Courses</h1>
          {courses.length === 0 ? (
            <p>No courses assigned yet.</p>
          ) : (
            courses.map((course) => (
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
              </BaseDropdownMenu>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
