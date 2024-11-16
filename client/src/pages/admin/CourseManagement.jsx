import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import DropdownButton from "../../components/buttons/DropdownButton";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);

  // Sidebar menu items
  const sidebarItems = [
    {
      label: "Faculty Management",
      path: "/admin/faculty-management",
      onClick: () => (window.location.href = "/admin/faculty-management"),
    },
    {
      label: "Course Management",
      path: "/admin/course-management",
      onClick: () => (window.location.href = "/admin/course-management"),
    },
  ];

  // Mock data
  const mockCourses = [
    {
      id: 1,
      name: "DevOps",
      description: "Learn the principles of DevOps and CI/CD pipelines.",
      instructor: "Dr. John Doe",
      time: "10:30 AM - 12:00 PM",
      room: "Room 101",
    },
    {
      id: 2,
      name: "Serverless",
      description: "An introduction to serverless computing.",
      instructor: "Prof. Jane Smith",
      time: "1:00 PM - 2:30 PM",
      room: "Room 202",
    },
    {
      id: 3,
      name: "AWS",
      description: "Master cloud services with AWS.",
      instructor: "Dr. Alice Johnson",
      time: "9:00 AM - 10:30 AM",
      room: "Room 303",
    },
    {
      id: 4,
      name: "Azure",
      description: "Comprehensive course on Azure cloud solutions.",
      instructor: "Prof. Bob Brown",
      time: "3:00 PM - 4:30 PM",
      room: "Room 404",
    },
  ];

  // Fetch course data
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // replace with actual API
        const response = await fetch("/api/courses");

        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }

        // Uncomment and use this in production
        // const data = await response.json();
        // setCourses(data);

        setCourses(mockCourses); // Use mock data temporarily
      } catch (err) {
        console.error("Error fetching courses:", err);
        setCourses([]);
      }
    };

    fetchCourses();
  }, []);

  // Function to delete a course
  const deleteCourse = async (courseId) => {
    try {
      // Send DELETE request to the server to delete the course
      // const response = await fetch(`/api/courses/${courseId}`, {
      //   method: "DELETE",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to delete course");
      // }

      // Remove course from local state
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseId)
      );

      
      console.log(`Course with ID: ${courseId} has been deleted.`);
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1">
        <Navbar role="admin" />

        <AddButton
          label="Add Course"
          onClick={() => (window.location.href = "/admin/add-course")}
          color="gray"
        />

        {courses.length > 0 &&
          courses.map((course) => (
            <BaseDropdownMenu key={course.id} title={course.name}>
              <div className="px-6 py-3">
                {/* Course Information */}
                <div className="mb-4">
                  <p className="font-semibold">Course Name:</p>
                  <p>{course.name}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Course Description:</p>
                  <p>{course.description || "N/A"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Instructor:</p>
                  <p>{course.instructor || "TBD"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Time:</p>
                  <p>{course.time || "TBD"}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Room:</p>
                  <p>{course.room || "TBD"}</p>
                </div>

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
                    onClick={() => deleteCourse(course.id)} // Call deleteCourse on click
                    color="red"
                  />
                </div>
              </div>
            </BaseDropdownMenu>
          ))}
      </div>
    </div>
  );
};

export default CourseManagement;
