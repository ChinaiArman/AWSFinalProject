import React from "react";
import Timetable from "../../components/Timetable";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";

const MyTimetable = () => {
  // Sample faculty-specific timetable data (replace with actual data from backend)
  const facultyTimetableData = [
    { day: "Monday", courseName: "Cloud Computing", startTime: "08:30", endTime: "10:20", color: "#FF5733" },
    { day: "Wednesday", courseName: "DevOps Fundamentals", startTime: "11:30", endTime: "13:20", color: "#33B5FF" },
    { day: "Friday", courseName: "AI Basics", startTime: "14:30", endTime: "15:20", color: "#FFC300" },
  ];

  // Sidebar menu items for faculty
  const sidebarItems = [
    { label: "My Courses", path: "/faculty/my-courses", onClick: () => (window.location.href = "/faculty/my-courses") },
    { label: "My Timetable", path: "/faculty/my-timetable", onClick: () => (window.location.href = "/faculty/my-timetable") },
    { label: "Time Availability", path: "/faculty/time-availability", onClick: () => (window.location.href = "/faculty/time-availability") },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold text-center mb-6">Faculty My Timetable</h1>
          <Timetable timetableData={facultyTimetableData} />
        </div>
      </div>
    </div>
  );
};

export default MyTimetable;
