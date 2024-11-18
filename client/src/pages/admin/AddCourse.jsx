import React, { useState, useEffect } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import ScheduleTable from "../../components/ScheduleTable";
import DropdownButton from "../../components/buttons/DropdownButton";
import DropdownList from "../../components/DropdownList";
import { useNavigate } from "react-router-dom";
import ConfirmationPopup from "../../components/ConfirmationPopup";

const AddCourse = () => {
  const navigate = useNavigate();

   // Sidebar menu items
   const sidebarItems = [
    { label: "User Management", path: "/admin/user-management", onClick: () => navigate("/admin/user-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => navigate("/admin/course-management") },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const timeSlots = [
    "8:30-9:20",
    "9:30-10:20",
    "10:30-11:20",
    "11:30-12:20",
    "12:30-13:20",
    "13:30-14:20",
    "14:30-15:20",
    "15:30-16:20",
    "16:30-17:20",
  ];
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [courseName, setCourseName] = useState("");
const [courseDescription, setCourseDescription] = useState("");
const [instructor, setInstructor] = useState("");
const [roomNumber, setRoomNumber] = useState("");
const [seatAvailability, setSeatAvailability] = useState(""); // m
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

const handleCourseNameChange = (e) => {
  setCourseName(e.target.value);
};

const handleCourseDescriptionChange = (e) => {
  setCourseDescription(e.target.value);
};

const handleInstructorChange = (e) => {
  setInstructor(e.target.value);
};

const handleRoomNumberChange = (e) => {
  setRoomNumber(e.target.value);
};

const handleSeatAvailabilityChange = (e) => {
  setSeatAvailability(e.target.value);
};

  const [instructorOptions, setInstructorOptions] = useState([]);

  const toggleAvailability = (day, slot) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [slot]: !prevAvailability[day][slot],
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const courseData = {
      faculty_id: instructor,
      course_name: courseName,
      course_description: courseDescription,
      room_number: roomNumber,
      seats_available: seatAvailability,
      total_seats: seatAvailability,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/course/createCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Failed to save course data");
      }

      setIsPopupOpen(true);

      // Reset form after successful save
      setCourseName("");
      setCourseDescription("");
      setInstructor("");
      setRoomNumber("");
      setSeatAvailability("");
      setAvailability(() => {
        const initialAvailability = {};
        days.forEach((day) => {
          initialAvailability[day] = {};
          timeSlots.forEach((slot) => {
            initialAvailability[day][slot] = false;
          });
        });
        return initialAvailability;
      });
    } catch (error) {
      console.error("Error saving course data:", error);
    }
  };

  const handleApply = (newAvailability) => {
    const timeSlots = [];
  
    days.forEach((day) => {
      Object.entries(newAvailability[day]).forEach(([slot, isAvailable]) => {
        if (isAvailable) {
          const [startTime, endTime] = slot.split("-").map((time) => {
            const [hour, minute] = time.split(":");
            return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}:00`;
          });
  
          timeSlots.push({
            day,
            startTime,
            endTime,
          });
        }
      });
    });
  
    fetchAvailableInstructors(timeSlots);
  };
  


const fetchAvailableInstructors = async (timeSlots) => {
  console.log('timeslots:', timeSlots);
  try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/availability/getFacultyAvailableAtTimeSlots`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timeSlots }),
          credentials: "include"
      });

      if (!response.ok) throw new Error("Failed to fetch available instructors");

      const data = await response.json();

      const instructors = data.faculty.map((instr) => ({
          label: `${instr.first_name} ${instr.last_name}`,
          value: instr.id,
      }));

      setInstructorOptions(instructors);
  } catch (error) {
      console.error("Error fetching available instructors:", error);
  }
};


  return (
    <div className="flex h-screen">
      <BaseSidebar items={sidebarItems} />
      <div className="flex-1 overflow-y-auto">
        <Navbar role="admin" />
        {/* Form Container */}
        <form onSubmit={handleSave} className="mt-2 max-w-5xl mx-auto bg-white p-6 rounded shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Add a new course</h1>

          {/* Form Fields */}
          <TextField
            label="Course Name"
            name="courseName"
            value={courseName}
            onChange={handleCourseNameChange}
            placeholder="Enter course name"
            required
          />

          <TextField
            label="Course Description"
            name="courseDescription"
            value={courseDescription}
            onChange={handleCourseDescriptionChange}
            placeholder="Enter course description"
            required
          />

          <TextField
            label="Room Number"
            name="roomNumber"
            value={roomNumber}
            onChange={handleRoomNumberChange}
            placeholder="Enter room number"
            required
          />

          <TextField
            label="Seats Available"
            name="seatAvailability"
            value={seatAvailability}
            onChange={handleSeatAvailabilityChange}
            placeholder="Enter number of seats available"
            required
          />

          <div className="mb-4">
            <h2 className="text-md font-semibold">Class Schedule</h2>
            <ScheduleTable
              days={days}
              timeSlots={timeSlots}
              initialAvailability={availability}
              toggleAvailability={toggleAvailability}
              onSave={handleApply}

            />
          </div>

          <DropdownList
            label="Instructor"
            options={instructorOptions}
            selectedValue={instructor}
            onChange={handleInstructorChange}
          />
        </form>
        {/* Save & Cancel Buttons */}
        <div className="flex justify-center gap-10 mt-6">
            <DropdownButton
              label="Cancel"
              onClick={() => navigate("/admin/course-management")}
              color="gray"
            />
            <DropdownButton
              label="Save"
              type="submit"
              color="green"
              onClick={handleSave}
            />
          </div>
      </div>
      <ConfirmationPopup
        isOpen={isPopupOpen}
        title="Course Added"
        message={"Course has been added successfully"}
        onConfirm={() => {
          setIsPopupOpen(false);
          navigate("/admin/course-management");
        }}
        cancelLabel={null}
        confirmLabel="OK"
      />
    </div>
  );
};

export default AddCourse;
