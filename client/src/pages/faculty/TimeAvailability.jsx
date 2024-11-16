import React from "react";
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

  const handleSave = (availability) => {
    console.log("Saved Availability:", availability);
    // Future: Make API call to save availability in the backend
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Time Availability</h1>
      <ScheduleTable
        days={days}
        timeSlots={timeSlots}
        onSave={handleSave} // Pass save handler
      />
    </div>
  );
}

export default TimeAvailability;
