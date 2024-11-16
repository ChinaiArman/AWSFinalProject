import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ label, onClick, color = "blue", className = "" }) => {
    const baseClasses = 'w-48 text-white py-3 px-5 text-lg rounded focus:outline-none m-2';

    // 3 colours
    const colorClasses = {
        gray: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700",
        blue: "bg-blue-500 hover:bg-blue-600 active:bg-blue-700",
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${colorClasses[color] || colorClasses.blue} ${className}`}
        >
            <div className="flex items-center justify-start">
                <AddIcon className="text-white" /> {/* Icon on the left with margin */}
                <span className="flex-grow text-center">{label}</span> {/* Text centered */}
            </div>
        </button>
    );
};

export default AddButton;
