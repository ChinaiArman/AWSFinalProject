import React, { useState } from "react";
import ScheduleButton from "./buttons/ScheduleButton";

function ScheduleTable({ days, timeSlots, initialAvailability = {}, onSave }) {
  const [availability, setAvailability] = useState(() => {
    if (Object.keys(initialAvailability).length) {
      return initialAvailability;
    }

    const defaultAvailability = {};
    days.forEach((day) => {
      defaultAvailability[day] = {};
      timeSlots.forEach((slot) => {
        defaultAvailability[day][slot] = false;
      });
    });
    return defaultAvailability;
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

  const handleReset = () => {
    const resetAvailability = {};
    days.forEach((day) => {
      resetAvailability[day] = {};
      timeSlots.forEach((slot) => {
        resetAvailability[day][slot] = false;
      });
    });
    setAvailability(resetAvailability);
  };

  return (
    <div className="overflow-auto">
      <table className="table-auto w-full border-collapse border border-gray-300">
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
          {timeSlots.map((slot) => (
            <tr key={slot}>
              <td className="border border-gray-300 p-2">{slot}</td>
              {days.map((day) => (
                <td
                  key={`${day}-${slot}`}
                  className={`border border-gray-300 p-2 text-center cursor-pointer ${
                    availability[day][slot] ? "bg-green-200" : "bg-red-200"
                  }`}
                  onClick={() => toggleAvailability(day, slot)}
                >
                  {availability[day][slot] ? "✓" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4">
        <ScheduleButton
          label="Apply"
          onClick={() => onSave && onSave(availability)}
          color="blue"
        />
        <ScheduleButton
          label="Reset"
          onClick={handleReset}
          color="gray"
        />
      </div>
    </div>
  );
}

export default ScheduleTable;
