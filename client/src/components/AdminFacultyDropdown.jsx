import React from "react";
import BaseDropdownMenu from "./BaseDropdownMenu"; 
import DropdownButton from "./buttons/DropdownButton"

const AdminFacultyDropdown = ({ title, name, course, email }) => {
  return (
    <BaseDropdownMenu title={title}>
      <div className="">
        {/* Faculty Information */}
        <div className="mb-4">
          <p className="font-semibold">Name:</p>
          <p>{name}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Courses:</p>
          <p>{course}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Email:</p>
          <p>{email}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-12">
        <DropdownButton
            label="Edit"
            onClick={() => console.log("Button clicked! Placeholder action.")}
            color="gray"/> 
        <DropdownButton
            label="Fire"
            onClick={() => console.log("Button clicked! Placeholder action.")}
            color="red"/>
        </div>
      </div>
    </BaseDropdownMenu>
  );
};

export default AdminFacultyDropdown;
