import React, { useEffect, useState } from "react";
import ScheduleButton from "./buttons/ScheduleButton";

function ScheduleTable({ days, timeSlots, initialAvailability = {}, onSave }) {
  const [availability, setAvailability] = useState(initialAvailability);

  // Sync availability with `initialAvailability` prop whenever it changes
  useEffect(() => {
    setAvailability(initialAvailability);
  }, [initialAvailability]);

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
                    availability[day]?.[slot] ? "bg-green-200" : "bg-red-200"
                  }`}
                  onClick={() => toggleAvailability(day, slot)}
                >
                  {availability[day]?.[slot] ? "✓" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <div className="flex w-1/3 justify-between">
          <ScheduleButton label="Reset" color="gray" onClick={handleReset} />
          <ScheduleButton
            label="Apply"
            color="blue"
            onClick={() => onSave && onSave(availability)}
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleTable;
