import React, { useEffect, useState } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import DropdownButton from "../../components/buttons/DropdownButton";
import ConfirmationPopup from "../../components/ConfirmationPopup"; 

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [courseToDelete, setCourseToDelete] = useState(null); 

  // Sidebar menu items
  const sidebarItems = [
    {
      label: "User Management",
      path: "/admin/user-management",
      onClick: () => (window.location.href = "/admin/user-management"),
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

    // Fetch courses from the server when the component mounts
    useEffect(() => {
      const fetchCourses = async () => {
        try {
          const response = await fetch("http://localhost:5001/api/course/getAllCourses");
          if (!response.ok) {
            throw new Error("Failed to fetch courses");
          }
          const data = await response.json();
          console.log(data);
          setCourses(data.courses); 
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
  
      fetchCourses(); 
    }, []);

    //fetch faculty name using faculty id
    // useEffect(() => {
    //   const fetchCoursesWithFaculty = async () => {
    //     try {
    //       const response = await fetch("http://localhost:5001/api/course/getAllCourses");
    //       if (!response.ok) {
    //         throw new Error("Failed to fetch courses");
    //       }
    //       const data = await response.json();
    
    //       // Fetch faculty names for each course
    //       const coursesWithFaculty = await Promise.all(
    //         data.courses.map(async (course) => {
    //           const facultyName = await fetchFacultyName(course.faculty_id);
    //           return { ...course, instructor: facultyName }; // Add the instructor name to the course
    //         })
    //       );
    
    //       setCourses(coursesWithFaculty);
    //     } catch (error) {
    //       console.error("Error fetching courses with faculty:", error);
    //     }
    //   };
    
    //   fetchCoursesWithFaculty();
    // }, []);
    

  // Function to delete a course
  const deleteCourse = async (courseId) => {
    try {
      // Send DELETE request to the server to delete the course (mocked here)
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
      setIsPopupOpen(false); // Close the popup after deletion
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Open confirmation popup and set the course to delete
  const openDeleteConfirmation = (course) => {
    setCourseToDelete(course);
    setIsPopupOpen(true);
  };

  // Close the confirmation popup without deleting
  const cancelDelete = () => {
    setIsPopupOpen(false);
    setCourseToDelete(null);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} /> 

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar role="admin" />

        <AddButton
          label="Add Course"
          onClick={() => (window.location.href = "/admin/add-course")}
          color="gray"
        />

        {courses.length > 0 &&
          courses.map((course) => (
            <BaseDropdownMenu key={course.id} title={course.course_name}>
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
                  <p className="font-semibold">Instructor:</p>
                  <p>{course.faculty_id || "TBD"}</p>
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
                </div>
              </div>
            </BaseDropdownMenu>
          ))}
      </div>

      {/* Confirmation Popup */}
      <ConfirmationPopup
        isOpen={isPopupOpen}
        title="Delete Course"
        message={`Are you sure you want to delete the course "${courseToDelete?.name}"?`}
        onConfirm={() => deleteCourse(courseToDelete?.id)} 
        onCancel={cancelDelete} 
      />
    </div>
  );
};

export default CourseManagement;
