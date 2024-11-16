import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import ScheduleTable from "../../components/ScheduleTable";

function TimeAvailability() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const timeSlots = [
    "8:30-9:20",
    "9:30-10:20",
    "10:30-11:20",
    "11:30-12:20",
    "12:30-1:20",
    "1:30-2:20",
    "2:30-3:20",
    "3:30-4:20",
    "4:30-5:20",
  ];

  const sidebarItems = [
    { label: "My Courses", path: "/faculty/my-courses", onClick: () => (window.location.href = "/faculty/my-courses") },
    { label: "My Timetable", path: "/faculty/my-timetable", onClick: () => (window.location.href = "/faculty/my-timetable") },
    { label: "Time Availability", path: "/faculty/time-availability", onClick: () => (window.location.href = "/faculty/time-availability") },
  ];

  const [availability, setAvailability] = useState(() => {
    const initialAvailability = {};
    days.forEach((day) => {
      initialAvailability[day] = {};
      timeSlots.forEach((slot) => {
        initialAvailability[day][slot] = false;
      });
    });
    return initialAvailability;
  });

  const toggleAvailability = (day, slot) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [slot]: !prevAvailability[day][slot],
      },
    }));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Time Availability</h1>
          <ScheduleTable
            days={days}
            timeSlots={timeSlots}
            availability={availability}
            toggleAvailability={toggleAvailability}
          />
        </div>
      </div>
    </div>
  );
}

export default TimeAvailability;
