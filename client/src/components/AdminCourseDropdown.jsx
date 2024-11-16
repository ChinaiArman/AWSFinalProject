import React from "react";
import BaseDropdownMenu from "./BaseDropdownMenu"; 
import DropdownButton from "./buttons/DropdownButton"

const AdminCourseDropdown = ({ title, name, description, instructor, room, time }) => {
  return (
    <BaseDropdownMenu title={title}>
      <div className="">
        {/* Course Information */}
        <div className="mb-4">
          <p className="font-semibold">Course Name:</p>
          <p>{name}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Course Description:</p>
          <p>{description}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Instructor:</p>
          <p>{instructor}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Time:</p>
          <p>{time}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Room:</p>
          <p>{room}</p>
        </div>
      
        {/* Buttons */}
        <div className="flex justify-center gap-12">
        <DropdownButton
            label="Edit Information"
            onClick={() => console.log("Button clicked! Placeholder action.")}
            color="gray"/> 
        <DropdownButton
            label="Create Waitlist"
            onClick={() => console.log("Button clicked! Placeholder action.")}
            color="orange"/>
        </div>
      </div>
    </BaseDropdownMenu>
  );
};

export default AdminCourseDropdown;
