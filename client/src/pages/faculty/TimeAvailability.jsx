import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import ScheduleTable from "../../components/ScheduleTable";

function TimeAvailability() {
  const [facultyId, setFacultyId] = useState(null);

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "08:30-09:20",
    "09:30-10:20",
    "10:30-11:20",
    "11:30-12:20",
    "12:30-01:20",
    "01:30-02:20",
    "02:30-03:20",
    "03:30-04:20",
    "04:30-05:20",
  ];

  const predefinedTimeSlots = {
    "08:30-09:20": ["08:30:00", "09:20:00"],
    "09:30-10:20": ["09:30:00", "10:20:00"],
    "10:30-11:20": ["10:30:00", "11:20:00"],
    "11:30-12:20": ["11:30:00", "12:20:00"],
    "12:30-01:20": ["12:30:00", "13:20:00"],
    "01:30-02:20": ["13:30:00", "14:20:00"],
    "02:30-03:20": ["14:30:00", "15:20:00"],
    "03:30-04:20": ["15:30:00", "16:20:00"],
    "04:30-05:20": ["16:30:00", "17:20:00"],
  };

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

  // Function to convert "HH:MM:SS" to minutes since midnight
  const timeStringToMinutes = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Fetch the facultyId from the user session
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getUserBySession`, {
          method: 'GET',
          credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          const facultyIdFromProfile = data.user.profile.id; // Assuming this is the facultyId
          setFacultyId(facultyIdFromProfile);
        } else {
          console.error('Failed to fetch user profile');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch availability when facultyId is available
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!facultyId) {
        console.error('Faculty ID not available yet');
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/availability/${facultyId}`);
        const data = await response.json();

        console.log("API Response:", data);

        // Initialize transformedAvailability with all false
        const transformedAvailability = {};
        days.forEach((day) => {
          transformedAvailability[day] = {};
          timeSlots.forEach((slot) => {
            transformedAvailability[day][slot] = false;
          });
        });

        // Process each availability item from the API
        data.forEach((item) => {
          const { day, start_time, end_time, available } = item;

          console.log(`Processing: day=${day}, start_time=${start_time}, end_time=${end_time}, available=${available}`);

          const availabilityStartMinutes = timeStringToMinutes(start_time);

          // Match slots where slotStart equals availabilityStart
          for (const [slot, [slotStart, slotEnd]] of Object.entries(predefinedTimeSlots)) {
            const slotStartMinutes = timeStringToMinutes(slotStart);

            if (slotStartMinutes === availabilityStartMinutes) {
              if (transformedAvailability[day]) {
                transformedAvailability[day][slot] = available;
                console.log(`Matched Slot: ${slot} for Day: ${day}`);
              }
            }
          }
        });

        console.log("Transformed Availability:", transformedAvailability);
        setAvailability(transformedAvailability);
      } catch (error) {
        console.error("Error fetching availability:", error);
      }
    };

    fetchAvailability();
  }, [facultyId]); // Depend on facultyId

  const handleSave = async (newAvailability) => {
    console.log("Saved Availability:", newAvailability);

    if (!facultyId) {
      console.error('Faculty ID not available');
      return;
    }

    try {
      // Prepare the data to send to the backend
      const availabilityList = [];

      days.forEach((day) => {
        timeSlots.forEach((slot) => {
          const isAvailable = newAvailability[day][slot];
          if (isAvailable) {
            const [startTime, endTime] = predefinedTimeSlots[slot];
            availabilityList.push({
              day,
              start_time: startTime,
              end_time: endTime,
              available: true,
            });
          }
        });
      });

      // Send the availability list to the backend
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/availability/${facultyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availability: availabilityList }),
      });

      if (response.ok) {
        console.log('Availability updated successfully');
        
      } else {
        console.error('Failed to update availability');
      }
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <BaseSidebar items={sidebarItems} />
      <div className="flex-1">
        <Navbar role="faculty" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Time Availability</h1>
          <ScheduleTable
            days={days}
            timeSlots={timeSlots}
            initialAvailability={availability}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
}

export default TimeAvailability;
