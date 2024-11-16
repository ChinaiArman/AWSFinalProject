import React from "react";
import Timetable from "../../components/Timetable";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";

const MyTimetable = () => {
  // Sample student-specific timetable data (replace with actual data from backend)
  const studentTimetableData = [
    { day: "Monday", courseName: "Mathematics", startTime: "08:30", endTime: "09:20", color: "#FF5733" },
    { day: "Tuesday", courseName: "History", startTime: "10:30", endTime: "11:20", color: "#33B5FF" },
    { day: "Wednesday", courseName: "Physics", startTime: "13:30", endTime: "14:20", color: "#FFC300" },
    { day: "Thursday", courseName: "Biology", startTime: "15:30", endTime: "16:20", color: "#8A2BE2" },
  ];

  // Sidebar menu items for students
  const sidebarItems = [
    { label: "My Courses", path: "/student/my-courses", onClick: () => (window.location.href = "/student/my-courses") },
    { label: "My Timetable", path: "/student/my-timetable", onClick: () => (window.location.href = "/student/my-timetable") },
    { label: "Waitlist", path: "/student/waitlist", onClick: () => (window.location.href = "/student/waitlist") },
    { label: "Enroll Course", path: "/student/enroll-courses", onClick: () => (window.location.href = "/student/enroll-courses") },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Student My Timetable</h1>
          <Timetable timetableData={studentTimetableData} />
        </div>
      </div>
    </div>
  );
};

export default MyTimetable;
