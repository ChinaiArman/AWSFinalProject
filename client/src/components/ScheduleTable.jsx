import React from "react";

function ScheduleTable({ days, timeSlots, availability, toggleAvailability }) {
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
    </div>
  );
}

export default ScheduleTable;
