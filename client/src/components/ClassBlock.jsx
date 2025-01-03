// components/ClassBlock.jsx
import React from "react";

const ClassBlock = ({ courseName, startTime, endTime, color }) => {
  const calculateTimeInMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const startOfDay = calculateTimeInMinutes("08:30");
  const start = calculateTimeInMinutes(startTime);
  const end = calculateTimeInMinutes(endTime);

  const topPosition = ((start - startOfDay) / 60) * 60;
  const height = ((end - start) / 60) * 60;

  return (
    <div
      className="absolute left-2 right-2 rounded shadow-md text-white text-sm p-2"
      style={{
        top: `${topPosition}px`,
        height: `${height}px`,
        backgroundColor: color || "#4A90E2",
        overflowY: courseName.length > 30 ? "auto" : "hidden", // scroll for super long names
      }}
    >
      <div
        className="font-bold"
        style={{
          fontSize: courseName.length > 20 ? "0.75rem" : "1rem", // smaller font for long-ish names
        }}
      >
        {courseName}
      </div>
      <div>{`${startTime} - ${endTime}`}</div>
    </div>
  );
};

export default ClassBlock;
