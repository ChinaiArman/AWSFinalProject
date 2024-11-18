import React from "react";
import ClassBlock from "./ClassBlock";

const Timetable = ({ timetableData }) => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "08:30 - 09:20",
    "09:30 - 10:20",
    "10:30 - 11:20",
    "11:30 - 12:20",
    "12:30 - 13:20",
    "13:30 - 14:20",
    "14:30 - 15:20",
    "15:30 - 16:20",
    "16:30 - 17:20",
  ];

  // Array of colors for consistent color assignment
  const colors = ["#FF5733", "#33B5FF", "#FFC300", "#8A2BE2", "#28A745", "#E91E63"];

  // Function to assign a color based on courseName
  const getColorForCourse = (courseName = "Default") => {
    const index = Array.from(courseName).reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  return (
    <div className="grid grid-cols-6 border border-gray-200">
      {/* Time Column */}
      <div className="relative border-r border-gray-200 bg-gray-200">
        <div className="bg-gray-700 text-white text-center font-bold p-2">Time</div>
        <div className="relative h-full">
          {times.map((time, index) => (
            <div
              key={index}
              className="border-b border-gray-300 text-center font-semibold p-2 text-gray-800"
              style={{ height: "60px", fontSize: "1rem" }}
            >
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Timetable Columns */}
      {days.map((day) => (
        <div key={day} className="relative border-r border-gray-200 bg-white">
          <div className="bg-gray-300 text-center font-bold p-2 border-b border-gray-200">{day}</div>
          <div className="relative h-full">
            {timetableData
              .filter((item) => item.day === day)
              .map((classData, index) => (
                <ClassBlock
                  key={index}
                  courseName={classData.courseName}
                  startTime={classData.startTime}
                  endTime={classData.endTime}
                  color={getColorForCourse(classData.courseName)} // Assign color based on courseName
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timetable;
