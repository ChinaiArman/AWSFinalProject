import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";

function MyCourses() {
  const [courses, setCourses] = useState([]);
  const sidebarItems = [
    { label: "My Courses", onClick: () => (window.location.href = "/faculty/my-courses") },
    { label: "My Timetable", onClick: () => (window.location.href = "/faculty/my-timetable") },
    { label: "Time Availability", onClick: () => (window.location.href = "/faculty/time-availability") },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
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
      setCourses(data);
    };

    fetchCourses();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">My Courses</h1>
          {courses.length === 0 ? (
            <p>No courses assigned yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border p-4 rounded shadow hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-bold">{course.name}</h2>
                  <p className="text-sm text-gray-600">{course.description}</p>
                  <p className="mt-2">
                    <span className="font-bold">Schedule:</span> {course.schedule}
                  </p>
                  <p>
                    <span className="font-bold">Room:</span> {course.room}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCourses;
