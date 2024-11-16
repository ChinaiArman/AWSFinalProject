import React, { useState, useEffect } from "react";
import BaseSidebar from "../../components/BaseSidebar";
import Navbar from "../../components/Navbar";
import AddButton from "../../components/buttons/AddButton";
import BaseDropdownMenu from "../../components/BaseDropdownMenu";
import DropdownButton from "../../components/buttons/DropdownButton";
import ConfirmationPopup from "../../components/ConfirmationPopup"; 

const FacultyManagement = () => {
  const [faculties, setFaculties] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); 
  const [facultyToFire, setFacultyToFire] = useState(null); 

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

  // Mock data for faculties
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

  useEffect(() => {
    // Set mock data as initial state
    setFaculties(mockData);
  }, []);

  // Function to fire a faculty member
  const fireFaculty = async (facultyId) => {
    try {
      // Send DELETE request to the server to fire the faculty (mocked here)
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
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error firing faculty:", error);
    }
  };

  // Open confirmation popup and set the faculty to fire
  const openFireConfirmation = (faculty) => {
    setFacultyToFire(faculty);
    setIsPopupOpen(true);
  };

  // Close the confirmation popup without firing
  const cancelFire = () => {
    setIsPopupOpen(false);
    setFacultyToFire(null);
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
                    onClick={() => openFireConfirmation(faculty)} // Open confirmation popup
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
        title="Fire Faculty"
        message={`Are you sure you want to fire ${facultyToFire?.name}?`}
        onConfirm={() => fireFaculty(facultyToFire?.id)} // Confirm and fire the faculty
        onCancel={cancelFire} // Cancel and close the popup
      />
    </div>
  );
};

export default FacultyManagement;
