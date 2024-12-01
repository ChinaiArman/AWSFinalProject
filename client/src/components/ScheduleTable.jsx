import React, { useEffect, useState } from "react";
import ScheduleButton from "./buttons/ScheduleButton";

function ScheduleTable({
  days,
  timeSlots,
  initialAvailability = {},
  scheduledSlots = {},
  onSave,
  hideResetButton = false, // Controls visibility of Reset button
}) {
  const [availability, setAvailability] = useState(initialAvailability);

  // Sync availability with initialAvailability prop whenever it changes
  useEffect(() => {
    if (JSON.stringify(availability) !== JSON.stringify(initialAvailability)) {
      setAvailability(initialAvailability);
    }
  }, [initialAvailability]);

  const handleReset = () => {
    const resetAvailability = {};
    days.forEach((day) => {
      resetAvailability[day] = {};
      timeSlots.forEach((slot) => {
        // Keep scheduled slots as they are, reset others to false
        resetAvailability[day][slot] = availability[day][slot];
      });
    });
    setAvailability(resetAvailability);
  };

  const toggleAvailability = (day, slot) => {
    // Prevent toggling scheduled slots
    if (scheduledSlots[day] && scheduledSlots[day][slot]) {
      return;
    }

    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [slot]: !prevAvailability[day][slot],
      },
    }));
  };
  console.log(availability);
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
              {days.map((day) => {
                const isScheduled = scheduledSlots[day]?.[slot];
                const isAvailable = availability[day]?.[slot];
                  console.log(isScheduled, isAvailable);
                
                return (
                  <td
                    key={`${day}-${slot}`}
                    className={`border border-gray-300 p-2 text-center ${
                      isScheduled
                        ? "bg-blue-300 cursor-not-allowed" // Different color for scheduled slots
                        : isAvailable
                        ? "bg-green-200 cursor-pointer"
                        : "bg-red-200 cursor-pointer"
                    }`}
                    onClick={() => toggleAvailability(day, slot)}
                  >
                    {isScheduled ? "Scheduled" : isAvailable ? "✓" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        {/* Center the Apply button */}
        <div className="flex justify-center">
          <ScheduleButton
            label="Apply"
            color="blue"
            onClick={(e) => {
              e.preventDefault();
              onSave && onSave(availability);
            }}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default ScheduleTable;
