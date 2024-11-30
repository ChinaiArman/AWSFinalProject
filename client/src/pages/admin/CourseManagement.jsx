import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import DropdownButton from "../../components/buttons/DropdownButton";
import ConfirmationPopup from "../../components/ConfirmationPopup";
import { useNavigate } from "react-router-dom";

const CourseManagement = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [courseToToggle, setCourseToToggle] = useState(null);
  const [isTogglePopUpOpen, setIsTogglePopUpOpen] = useState(false);

  // Sidebar menu items
  const sidebarItems = [
    {
      label: "User Management",
      path: "/admin/user-management",
      onClick: () => navigate("/admin/user-management"),
    },
    {
      label: "Course Management",
      path: "/admin/course-management",
      onClick: () => navigate("/admin/course-management"),
    },
  ];

  // Fetch courses from the server when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/course/getAllCourses`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();

        setCourses(data.courses);
        console.log(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Function to delete a course
  const deleteCourse = async (courseId) => {
    try {
      // Send DELETE request to the backend
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/course/deleteCourse/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse error details
        throw new Error(errorData.error || "Failed to delete course");
      }

      // Update local state to remove the deleted course
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );

      console.log(`Course with ID: ${courseId} has been deleted.`);
      setIsPopupOpen(false); // Close the confirmation popup
    } catch (error) {
      console.error("Error deleting course:", error);
      alert(`Error: ${error.message}`); // Show an error message to the user
    }
  };
  const toggleCourseStatus = async (courseId, status) => {
    try {
      console.log(status, "kdsf");
      // Send DELETE request to the backend
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/course/toggleCourseStatus/${courseId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            course_status: !status,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse error details
        throw new Error(errorData.error || "Failed to toggle course status");
      }

      // Update local state to change coure status
      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course.id === courseId) {
            course.enable_course = !course.enable_course;
          }
          return course
        })
      );
      console.log(`Course with ID: ${courseId} has changed status.`);
      setIsTogglePopUpOpen(false); // Close the confirmation popup
    } catch (error) {
      console.error("Error changing status of course:", error);
      alert(`Error: ${error.message}`); // Show an error message to the user
    }
  };
  // Open confirmation popup and set the course to delete
  const openDeleteConfirmation = (course) => {
    setCourseToDelete(course);
    setIsTogglePopUpOpen(true);
  };

  const cancelToggle = () => {
    setIsTogglePopUpOpen(false);
    setCourseToDelete(null);
  };

  const openToggleConfirmation = (course) => {
    setCourseToToggle(course), setIsTogglePopUpOpen(true);
  };

  // Close the confirmation popup without deleting
  const cancelDelete = () => {
    setIsPopupOpen(false);
    setCourseToDelete(null);
  };
  console.log(courses);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar role="admin" />

        <AddButton
          label="Add Course"
          onClick={() => navigate("/admin/add-course")}
          color="gray"
        />

        {courses.length > 0 &&
          courses.map((course) => (
            <BaseDropdownMenu
              key={course.id}
              title={`${course.course_name} (ID: ${course.id})`}
            >
              <div className="px-6 py-3">
                {/* Course Information */}
                <div className="mb-4">
                  <p className="font-semibold">Course Name:</p>
                  <p>{course.course_name}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Course Description:</p>
                  <p>{course.course_description || "N/A"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Assigned Instructor:</p>
                  <p>
                    {course.facultyName
                      ? `${course.facultyName} (ID: ${course.faculty_id})`
                      : "TBD"}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Total seats:</p>
                  <p>{course.total_seats || "TBD"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Available seats:</p>
                  <p>{course.seats_available || "TBD"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Room:</p>
                  <p>{course.room_number || "TBD"}</p>
                </div>

                {/* <div className="mb-4">
                  <p className="font-semibold">Course Runtimes:</p>
                  <div>
                    {course.courseRuntimes && course.courseRuntimes.length > 0 ? (
                      course.courseRuntimes.map((runtime, index) => (
                        <div key={index} className="mb-2">
                          <p><strong>Start Time:</strong> {runtime.start_time}</p>
                          <p><strong>End Time:</strong> {runtime.end_time}</p>
                          <p><strong>Location:</strong> {runtime.location}</p>
                        </div>
                      ))
                    ) : (
                      <p>TBD</p>
                    )}
                  </div>
                </div> */}

                {/* Buttons */}
                <div className="flex justify-center gap-12">
                  <DropdownButton
                    label="Edit Information"
                    onClick={() => console.log("Edit button clicked!")}
                    color="gray"
                  />
                  <DropdownButton
                    label="Create Waitlist"
                    onClick={() => console.log("Waitlist button clicked!")}
                    color="orange"
                  />
                  <DropdownButton
                    label="Delete Course"
                    onClick={() => openDeleteConfirmation(course)} // Open confirmation popup
                    color="red"
                  />
                  {course.enable_course ? (
                    <DropdownButton
                      label="Disable Course"
                      onClick={() => openToggleConfirmation(course)} // Open confirmation popup
                      color="red"
                    />
                  ) : (
                    <DropdownButton
                      label="Enable Course"
                      onClick={() => openToggleConfirmation(course)} // Open confirmation popup
                      color="blue"
                    />
                  )}
                </div>
              </div>
            </BaseDropdownMenu>
          ))}
      </div>

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={isPopupOpen}
        title="Delete Course"
        message={`Are you sure you want to delete the course "${courseToDelete?.course_name}"?`}
        onConfirm={() => deleteCourse(courseToDelete?.id)}
        onCancel={cancelDelete}
      />

      <ConfirmationPopup
        isOpen={isTogglePopUpOpen}
        title="Toggle Course Status"
        message={`Are you sure you want to enable/disbale the course "${courseToToggle?.course_name}"?`}
        onConfirm={() =>
          toggleCourseStatus(courseToToggle?.id, courseToToggle?.enable_course)
        }
        onCancel={cancelToggle}
      />
    </div>
  );
};

export default CourseManagement;
