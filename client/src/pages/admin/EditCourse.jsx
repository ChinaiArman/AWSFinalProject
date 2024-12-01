import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import TextField from "../../components/TextField";
import ScheduleTable from "../../components/ScheduleTable";
import DropdownList from "../../components/DropdownList";
import DropdownButton from "../../components/buttons/DropdownButton";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import { toast } from 'react-toastify';

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const sidebarItems = [
    // ... your sidebar items
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
    "08:30-09:20",
    "09:30-10:20",
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
          // Ensure times have leading zeros
          const formatTime = (timeStr) => {
            const [hour, minute] = timeStr.split(":").map(Number);
            return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
          };

          const startTimeFormatted = formatTime(start_time);
          const endTimeFormatted = formatTime(end_time);

          const slot = `${startTimeFormatted}-${endTimeFormatted}`;
          if (availability[day_of_week]) {
            availability[day_of_week][slot] = true;
          }
        });

        setCourseData({
          courseName: data.course.course_name,
          courseDescription: data.course.course_description,
          roomNumber: data.course.room_number,
          seatAvailability: data.course.seats_available,
          startDate: data.runtimes[0]?.start_date.split("T")[0] || "",
          availability,
          instructor: data.course.faculty_id,
        });
      } catch (error) {
        console.error("Error fetching course details:", error);
        toast.error(`Error: ${error.message}`);
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
            const [hour, minute] = time.split(":").map(Number);
            return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
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
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Calculate default end date based on start date
    const defaultEndDate = new Date(courseData.startDate);
    defaultEndDate.setMonth(defaultEndDate.getMonth() + 1);

    // Format availability into runtime entries
    const runtimeEntries = [];
    days.forEach((day) => {
      if (courseData.availability[day]) {
        Object.entries(courseData.availability[day]).forEach(([slot, isAvailable]) => {
          if (isAvailable) {
            const [startTime, endTime] = slot.split("-").map((time) => {
              const [hour, minute] = time.split(":").map(Number);
              return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
            });

            runtimeEntries.push({
              start_date: courseData.startDate,
              end_date: defaultEndDate.toISOString().split("T")[0],
              day_of_week: day,
              start_time: startTime,
              end_time: endTime || "17:00:00",
              location: courseData.roomNumber,
            });
          }
        });
      }
    });

    if (runtimeEntries.length === 0) {
      console.error("No runtime entries were generated.");
      toast.error("Please select at least one time slot.");
      return;
    }

    const updatedCourse = {
      faculty_id: courseData.instructor,
      course_name: courseData.courseName,
      course_description: courseData.courseDescription,
      room_number: courseData.roomNumber,
      seats_available: courseData.seatAvailability,
      total_seats: courseData.seatAvailability,
      enable_course: true,
    };

    try {
      // Step 1: Update course details
      const courseResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/course/updateCourse/${courseId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedCourse),
          credentials: "include",
        }
      );

      if (!courseResponse.ok) {
        const errorData = await courseResponse.json();
        throw new Error(errorData.error || "Failed to update course details.");
      }
      console.log("Course details updated successfully.");

      // Step 2: Delete existing runtimes
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/course/deleteCourseRuntimes/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        throw new Error(errorData.error || "Failed to delete course runtimes.");
      }
      console.log("Existing course runtimes deleted successfully.");

      // Step 3: Create new runtimes
      for (const runtime of runtimeEntries) {
        console.log("Sending runtime data:", runtime);
        const runtimeResponse = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/course/createCourseRuntime/${courseId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(runtime),
            credentials: "include",
          }
        );

        if (!runtimeResponse.ok) {
          throw new Error("Failed to save course runtime");
        }
        console.log("Course runtime saved successfully");
      }

      // Show success confirmation popup
      setIsPopupOpen(true);
      toast.success("Course updated successfully!");
    } catch (error) {
      console.error("Error updating course data:", error);
      toast.error(`Error: ${error.message}`);
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
