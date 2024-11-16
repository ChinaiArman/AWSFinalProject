import React from "react";
import BaseDropdownMenu from "./BaseDropdownMenu";
import DropdownButton from "./buttons/DropdownButton";
import ScheduleButton from "./buttons/ScheduleButton";
import AddButton from "./buttons/AddButton";

const AdminFacultyDropdown = ({ title = "Default Title" }) => {
  return (
    <div className="space-y-4">
      {/* Use BaseDropdownMenu and pass custom title as a prop */}
      <BaseDropdownMenu title={title}>
        {/* Additional content specific to the dropdown */}
      </BaseDropdownMenu>

      <DropdownButton
        label="DropdownButton"
        onClick={() => console.log('Button clicked! Placeholder action.')}
        color="red"/>

      <ScheduleButton
        label="ScheduleButton"
        onClick={() => console.log('Apply clicked')}
        color="blue" />


        <AddButton
         label="Add Faculty"
         onClick={() => console.log('Apply clicked')}
         color="gray" />
    </div>
  );
};

export default AdminFacultyDropdown;
