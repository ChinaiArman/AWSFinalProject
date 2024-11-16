import React, { useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import DropdownList from "../../components/DropdownList";
import TextField from "../../components/TextField";
import ScheduleTable from "../../components/ScheduleTable";
import DropdownButton from "../../components/buttons/DropdownButton";

const AddCourse = () => {
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

  // State variables to store form data
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [seatAvailability, setSeatAvailability] = useState("");
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

  // Function to toggle availability for a time slot
  const toggleAvailability = (day, slot) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: {
        ...prevAvailability[day],
        [slot]: !prevAvailability[day][slot],
      },
    }));
  };

  // mock data
  const categoryOptions = [
    { label: "Science", value: "science" },
    { label: "Arts", value: "arts" },
    { label: "Technology", value: "technology" },
  ];

  // Sidebar menu items
  const sidebarItems = [
    { label: "Faculty Management", path: "/admin/faculty-management", onClick: () => (window.location.href = "/admin/faculty-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => (window.location.href = "/admin/course-management") },
  ];

  // Handle form submission
  const handleSave = async () => {
    const courseData = {
      courseName,
      courseDescription,
      instructor,
      roomNumber,
      seatAvailability,
      availability,
    };

    try {
      // replace with api
      const response = await fetch("/api/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error("Failed to save course data");
      }

      //reset 
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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">

        <Navbar role="admin" />
        <h1 className="text-2xl font-bold text-center mb-6">Add a new course:</h1>

        <TextField
          label="Course Name:"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Enter course name"
        />

        <TextField
          label="Course Description:"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          placeholder="Enter course description"
        />

        <ScheduleTable
          days={days}
          timeSlots={timeSlots}
          availability={availability}
          toggleAvailability={toggleAvailability}
        />

        <DropdownList
          label="Assign Instructor:"
          options={categoryOptions}
          selectedValue={instructor}
          onChange={(e) => setInstructor(e.target.value)}
        />

        <TextField
          label="Room Number:"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          placeholder="Enter a room number"
        />

        <TextField
          label="Number of Seats Available:"
          value={seatAvailability}
          onChange={(e) => setSeatAvailability(e.target.value)}
          placeholder="Enter a number"
        />

        <div className="mt-auto flex justify-center gap-10 mb-6">
          <DropdownButton
            label="Cancel"
            onClick={() => console.log("Button clicked! Placeholder action.")}
            color="gray"
          />

          <DropdownButton
            label="Save"
            onClick={handleSave} // Call handleSave on Save button click
            color="green"
          />
        </div>

      </div>
    </div>
  );
};

export default AddCourse;
