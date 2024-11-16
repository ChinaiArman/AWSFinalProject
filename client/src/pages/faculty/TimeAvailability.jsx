import React, { useState } from "react";

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

  const [availability, setAvailability] = useState(
    Array(timeSlots.length)
      .fill(null)
      .map(() => Array(days.length).fill(false))
  );

  const toggleAvailability = (row, col) => {
    const newAvailability = [...availability];
    newAvailability[row][col] = !newAvailability[row][col];
    setAvailability(newAvailability);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Time Availability</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Time</th>
            {days.map((day) => (
              <th key={day} className="border border-gray-300 p-2">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-gray-300 p-2">{slot}</td>
              {days.map((day, colIndex) => (
                <td
                  key={colIndex}
                  className="border border-gray-300 p-2 text-center cursor-pointer"
                  onClick={() => toggleAvailability(rowIndex, colIndex)}
                >
                  {availability[rowIndex][colIndex] ? "✓" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeAvailability;
