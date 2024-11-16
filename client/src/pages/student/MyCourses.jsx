import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for courses (replace with your actual data source)
  const courses = [
    { id: 1, name: 'Math 101' },
    { id: 2, name: 'History 201' },
    { id: 3, name: 'Physics 301' },
    { id: 4, name: 'Biology 101' },
    { id: 5, name: 'Computer Science 101' },
  ];

  // Sidebar menu items for students
  const sidebarItems = [
    { label: "My Courses", path: "/student/my-courses", onClick: () => (window.location.href = "/student/my-courses") },
    { label: "My Timetable", path: "/student/my-timetable", onClick: () => (window.location.href = "/student/my-timetable") },
    { label: "Waitlist", path: "/student/waitlist", onClick: () => (window.location.href = "/student/waitlist") },
    { label: "Enroll Course", path: "/student/enroll-courses", onClick: () => (window.location.href = "/student/enroll-courses") },
  ];


  // Filter courses based on the search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar role="student" />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">My Courses</h1>

          {/* Search Bar */}
          <SearchBar
            placeholder="Search for a course..."
            onSearch={setSearchQuery} // Update search query when user types
          />

          {/* Display the filtered list of courses */}
          <div>
            {filteredCourses.length > 0 ? (
              <ul>
                {filteredCourses.map((course) => (
                  <li key={course.id} style={{ margin: '10px 0', fontSize: '18px' }}>
                    {course.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No courses found.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyCourses;
