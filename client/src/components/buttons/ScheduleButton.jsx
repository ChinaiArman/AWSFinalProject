import React from "react";

const ScheduleButton = ({ label, onClick, color = "blue", className = "" }) => {
    const baseClasses = 'w-32 text-white rounded py-2 px-4 text-sm focus:outline-none m-2'

    // 2 colours 
    const colorClasses = {
        gray: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
        blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${colorClasses[color] || colorClasses.blue} ${className}`}
        >
            {label}
        </button>
    );
};

export default ScheduleButton;
