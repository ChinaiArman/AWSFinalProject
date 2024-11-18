import React, { useState, useEffect } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import ScheduleTable from "../../components/ScheduleTable";
import DropdownButton from "../../components/buttons/DropdownButton";
import DropdownList from "../../components/DropdownList";

const AddCourse = () => {

   // Sidebar menu items
   const sidebarItems = [
    { label: "User Management", path: "/admin/user-management", onClick: () => (window.location.href = "/admin/user-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => (window.location.href = "/admin/course-management") },
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

  // State for form data
  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    instructor: "",
    roomNumber: "",
    seatAvailability: "",
    availability: () => {
      const initialAvailability = {};
      days.forEach((day) => {
        initialAvailability[day] = {};
        timeSlots.forEach((slot) => {
          initialAvailability[day][slot] = false;
        });
      });
      return initialAvailability;
    },
  });

  const [instructorOptions, setInstructorOptions] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  // useEffect(() => {
  //   const fetchInstructors = async () => {

  //     // Mock data for now
  //     const mockInstructors = [
  //       { label: "Instructor 1", value: "instructor1" },
  //       { label: "Instructor 2", value: "instructor2" },
  //       { label: "Instructor 3", value: "instructor3" },
  //     ];

  //     setInstructorOptions(mockInstructors);

  //     // For actual fetching from backend, you can use:
  //     // const response = await fetch("/api/instructors");
  //     // const data = await response.json();
  //     // setInstructorOptions(data);
  //   };

  //   fetchInstructors();
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleAvailability = (day, slot) => {
    setFormData((prevData) => ({
      ...prevData,
      availability: {
        ...prevData.availability,
        [day]: {
          ...prevData.availability[day],
          [slot]: !prevData.availability[day][slot],
        },
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const courseData = {
      courseName: formData.courseName,
      courseDescription: formData.courseDescription,
      instructor: formData.instructor,
      roomNumber: formData.roomNumber,
      seatAvailability: formData.seatAvailability,
      availability: formData.availability,
    };

    console.log('COURSE DATA', courseData)

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/course/createCourse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        throw new Error("Failed to save course data");
      }

      // Reset form after successful save
      setFormData({
        courseName: "",
        courseDescription: "",
        instructor: "",
        roomNumber: "",
        seatAvailability: "",
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
  
    console.log("Formatted time slots:", timeSlots); 
    fetchAvailableInstructors(timeSlots);
  };
  


const fetchAvailableInstructors = async (timeSlots) => {
  try {
      console.log("timeslots to api:", timeSlots); 

      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/availability/getFacultyAvailableAtTimeSlots`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ timeSlots }),
      });

      if (!response.ok) throw new Error("Failed to fetch available instructors");

      const data = await response.json();
      console.log("response:", data); 

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
            value={formData.courseName}
            onChange={handleChange}
            placeholder="Enter course name"
            required
          />

          <TextField
            label="Course Description"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            placeholder="Enter course description"
            required
          />

          <TextField
            label="Room Number"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            placeholder="Enter room number"
            required
          />

          <TextField
            label="Seats Available"
            name="seatAvailability"
            value={formData.seatAvailability}
            onChange={handleChange}
            placeholder="Enter number of seats available"
            required
          />

          <div className="mb-4">
            <h2 className="text-md font-semibold">Class Schedule</h2>
            <ScheduleTable
              days={days}
              timeSlots={timeSlots}
              initialAvailability={formData.availability}
              toggleAvailability={toggleAvailability}
              onSave={handleApply}

            />
          </div>

          <DropdownList
            label="Instructor"
            options={instructorOptions}
            selectedValue={formData.instructor}
            onChange={handleChange}
          />
        </form>
        {/* Save & Cancel Buttons */}
        <div className="flex justify-center gap-10 mt-6">
            <DropdownButton
              label="Cancel"
              onClick={() => (window.location.href = "/admin/course-management")}
              color="gray"
            />
            <DropdownButton
              label="Save"
              type="submit"
              color="green"
            />
          </div>
      </div>
    </div>
  );
};

export default AddCourse;
