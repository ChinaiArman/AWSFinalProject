import React, { useState, useEffect } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import DropdownButton from "../../components/buttons/DropdownButton";

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState([]);

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
  const mockData = [
    {
      id: 1,
      name: "Dr. John Doe",
      course: "Advanced Physics",
      email: "johndoe@example.com",
    },
    {
      id: 2,
      name: "Prof. Jane Smith",
      course: "Creative Writing",
      email: "janesmith@example.com",
    },
    {
      id: 3,
      name: "Dr. Alice Johnson",
      course: "Introduction to Chemistry",
      email: "alicejohnson@example.com",
    },
  ];

  // Fetch faculty data
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        // replace with api
        const response = await fetch("/api/faculties");

        if (!response.ok) {
          throw new Error("Failed to fetch faculty data");
        }

        // Uncomment and use this in production
        // const data = await response.json();
        // setFaculties(data);

        setFaculties(mockData); // Use mock data temporarily
      } catch (error) {
        console.error("Error fetching data:", error);
        setFaculties([]);
      }
    };

    fetchFaculties();
  }, []);

  // Function to fire a faculty member
  const fireFaculty = async (facultyId) => {
    try {
     
      // const response = await fetch(`/api/faculty/${facultyId}`, {
      //   method: "DELETE",
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to fire faculty");
      // }

      // Remove faculty from local state
      setFaculties((prevFaculties) =>
        prevFaculties.filter((faculty) => faculty.id !== facultyId)
      );

      console.log(`Faculty with ID: ${facultyId} has been fired.`);
    } catch (error) {
      console.error("Error firing faculty:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <BaseSidebar items={sidebarItems} />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <Navbar role="admin" />

        <AddButton
          label="Add Faculty"
          onClick={() => (window.location.href = "/admin/add-faculty")}
          color="gray"
        />

        {faculties.length > 0 &&
          faculties.map((faculty) => (
            <BaseDropdownMenu key={faculty.id} title={faculty.name}>
              <div className="px-6 py-3">
                <div className="mb-4">
                  <p className="font-semibold">Name:</p>
                  <p>{faculty.name}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Courses:</p>
                  <p>{faculty.course}</p>
                </div>
                <div className="mb-4">
                  <p className="font-semibold">Email:</p>
                  <p>{faculty.email}</p>
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-12">
                  <DropdownButton
                    label="Edit"
                    onClick={() => console.log(`Editing ${faculty.name}`)}
                    color="gray"
                  />
                  <DropdownButton
                    label="Fire"
                    onClick={() => fireFaculty(faculty.id)} // Call fireFaculty on click
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

export default FacultyManagement;
