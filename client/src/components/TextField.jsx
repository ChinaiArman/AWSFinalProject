import React from "react";

const TextField = ({
  label,
  onChange,
  placeholder,
  type = "text",
  value = "",
}) => {
  return (
    <div className="mb-1">
      <div className="flex items-center">
        <label className="text-md font-medium  w-1/4 text-right">{label}</label>
        <input
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          className="mt-1 ml-12 mr-12 p-2 w-3/4 border rounded"
        />
      </div>
    </div>
  );
};

export default TextField;
