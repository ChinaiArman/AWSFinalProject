import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import ScheduleTable from "../../components/ScheduleTable";
import { useNavigate } from "react-router-dom";

function TimeAvailability() {
  const navigate = useNavigate();
  const [facultyId, setFacultyId] = useState(null); // Faculty ID state
  const [availability, setAvailability] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Loading state

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
    { label: "My Courses", path: "/faculty/my-courses", onClick: () => navigate("/faculty/my-courses") },
    { label: "My Timetable", path: "/faculty/my-timetable", onClick: () => navigate("/faculty/my-timetable") },
    { label: "Time Availability", path: "/faculty/time-availability", onClick: () => navigate("/faculty/time-availability") },
  ];

  // Fetch user profile to get faculty ID
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/user/getUserBySession`, {
          method: "GET",
          credentials: "include", // Include cookies in the request
        });

        if (response.ok) {
          const data = await response.json();
          setFacultyId(data.user?.profile?.id || null);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  // Fetch availability data
  useEffect(() => {
    const fetchAvailability = async () => {
      if (!facultyId) {
        return; // Wait until facultyId is available
      }

      try {
        setIsLoading(true); // Start loading

        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/availability/${facultyId}`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const transformedAvailability = {};

        // Initialize all slots as false
        days.forEach((day) => {
          transformedAvailability[day] = {};
          timeSlots.forEach((slot) => {
            transformedAvailability[day][slot] = false;
          });
        });

        // Process API response
        data.forEach((item) => {
          const { day, start_time, available } = item;
          const availabilityStartMinutes = timeStringToMinutes(start_time);

          Object.entries(predefinedTimeSlots).forEach(([slot, [slotStart]]) => {
            const slotStartMinutes = timeStringToMinutes(slotStart);

            if (slotStartMinutes === availabilityStartMinutes) {
              if (transformedAvailability[day]) {
                transformedAvailability[day][slot] = available;
              }
            }
          });
        });

        setAvailability(transformedAvailability); // Set availability state
      } catch (error) {
        console.error("Error fetching availability:", error);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchAvailability();
  }, [facultyId]);

  // Helper function to convert time to minutes
  const timeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Handle save action
  const handleSave = async (newAvailability) => {
    if (!facultyId) {
      console.error("Faculty ID not available");
      return;
    }

    try {
      const availabilityList = [];

      // Transform availability into API format
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

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/availability/updateAvailabilities`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ availability: availabilityList }),
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Availability updated successfully");
      } else {
        console.error("Failed to update availability");
      }
    } catch (error) {
      console.error("Error updating availability:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <BaseSidebar dashboardName="Faculty Dashboard" items={sidebarItems} />
      <div className="flex-1">
        <Navbar role="faculty" />
        <div className="p-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">Time Availability</h1>
              <ScheduleTable
                days={days}
                timeSlots={timeSlots}
                initialAvailability={availability}
                onSave={handleSave}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TimeAvailability;
