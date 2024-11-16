import React from 'react';

const DropdownList = ({ label, options, selectedValue, onChange }) => {
    return (
        <div className="mb-4">
            <div className="flex items-center"> 
                <label className="text-md font-medium text-gray-700 w-1/4 text-right">{label}</label> {/* Adjusted width */}
                <select
                    value={selectedValue}
                    onChange={onChange}
                    className="relative z-10 w-64 mt-1 ml-12 mr-12 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default DropdownList;
