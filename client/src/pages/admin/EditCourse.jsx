import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import ScheduleTable from "../../components/ScheduleTable";
import DropdownList from "../../components/DropdownList";
import DropdownButton from "../../components/buttons/DropdownButton";
import ConfirmationPopup from "../../components/ConfirmationPopup";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const sidebarItems = [
    { label: "User Management", path: "/admin/user-management", onClick: () => navigate("/admin/user-management") },
    { label: "Course Management", path: "/admin/course-management", onClick: () => navigate("/admin/course-management") },
  ];

  const [courseData, setCourseData] = useState({
    courseName: "",
    courseDescription: "",
    roomNumber: "",
    seatAvailability: "",
    startDate: "",
    availability: {},
    instructor: "",
  });

  const [instructorOptions, setInstructorOptions] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  // Fetch course details
  useEffect(() => {
    const fetchCourseDetails = async () => {
      if (!courseId) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/course/${courseId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch course details");

        const data = await response.json();

        // Format availability from runtime data
        const availability = {};
        days.forEach((day) => {
          availability[day] = {};
          timeSlots.forEach((slot) => (availability[day][slot] = false));
        });

        data.runtimes.forEach(({ day_of_week, start_time, end_time }) => {
          const slot = `${start_time.split(":").slice(0, 2).join(":")}-${end_time.split(":").slice(0, 2).join(":")}`;
          if (availability[day_of_week]) {
            availability[day_of_week][slot] = true;
          }
        });

        setCourseData({
          courseName: data.course.course_name,
          courseDescription: data.course.course_description,
          roomNumber: data.course.room_number,
          seatAvailability: data.course.seats_available,
          startDate: data.runtimes[0].start_date.split("T")[0],
          availability,
          instructor: data.course.faculty_id,
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleApply = async (updatedAvailability) => {
    // Prepare time slots
    const timeSlotsArray = [];
    days.forEach((day) => {
      Object.entries(updatedAvailability[day] || {}).forEach(([slot, isAvailable]) => {
        if (isAvailable) {
          const [startTime, endTime] = slot.split("-").map((time) => {
            const [hour, minute] = time.split(":");
            return `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}:00`;
          });

          timeSlotsArray.push({
            day,
            startTime,
            endTime,
          });
        }
      });
    });

    console.log("Sending time slots to API:", timeSlotsArray);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/availability/getFacultyAvailableAtTimeSlots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeSlots: timeSlotsArray }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch available instructors");

      const data = await response.json();

      const instructors = data.faculty.map((instr) => ({
        label: `${instr.first_name} ${instr.last_name}`,
        value: instr.id,
      }));

      setInstructorOptions(instructors);
      console.log("Instructor options updated:", instructors);
    } catch (error) {
      console.error("Error fetching available instructors:", error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedCourse = {
      faculty_id: courseData.instructor,
      course_name: courseData.courseName,
      course_description: courseData.courseDescription,
      room_number: courseData.roomNumber,
      seats_available: courseData.seatAvailability,
      total_seats: courseData.seatAvailability,
      start_date: courseData.startDate,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/course/updateCourse/${courseId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCourse),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update course");

      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <BaseSidebar dashboardName="Admin Dashboard" items={sidebarItems} />
      <div className="flex-1 overflow-y-auto">
        <Navbar role="admin" />
        <form onSubmit={handleSave} className="max-w-5xl mx-auto p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Edit Course</h1>
          <TextField
            label="Course Name"
            name="courseName"
            value={courseData.courseName}
            onChange={(e) => setCourseData({ ...courseData, courseName: e.target.value })}
            required
          />
          <TextField
            label="Course Description"
            name="courseDescription"
            value={courseData.courseDescription}
            onChange={(e) => setCourseData({ ...courseData, courseDescription: e.target.value })}
            required
          />
          <TextField
            label="Room Number"
            name="roomNumber"
            value={courseData.roomNumber}
            onChange={(e) => setCourseData({ ...courseData, roomNumber: e.target.value })}
            required
          />
          <TextField
            label="Seats Available"
            name="seatAvailability"
            value={courseData.seatAvailability}
            onChange={(e) => setCourseData({ ...courseData, seatAvailability: e.target.value })}
            required
          />
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            value={courseData.startDate}
            onChange={(e) => setCourseData({ ...courseData, startDate: e.target.value })}
            required
          />
          <ScheduleTable
            days={days}
            timeSlots={timeSlots}
            initialAvailability={courseData.availability}
            onSave={(updatedAvailability) => {
              setCourseData({ ...courseData, availability: updatedAvailability });
              handleApply(updatedAvailability);
            }}
            hideResetButton={true}
          />
          <DropdownList
            label="Instructor"
            options={instructorOptions}
            selectedValue={courseData.instructor}
            onChange={(value) => setCourseData({ ...courseData, instructor: value })}
          />
          <div className="flex justify-center gap-4 mt-6">
            <DropdownButton label="Cancel" onClick={() => navigate("/admin/course-management")} />
            <DropdownButton label="Save" type="submit" />
          </div>
        </form>
        <ConfirmationPopup
          isOpen={isPopupOpen}
          title="Course Updated"
          message="The course has been updated successfully."
          onConfirm={() => navigate("/admin/course-management")}
          confirmLabel="Ok"
        />
      </div>
    </div>
  );
};

export default EditCourse;
