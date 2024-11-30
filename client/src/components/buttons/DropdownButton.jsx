import React from 'react';

const DropdownButton = ({ label, onClick, color = 'blue', className = '' }) => {
  const baseClasses = 'w-48 text-white py-2 px-6 text-base rounded focus:outline-none m-2';

  // different colours
  const colorClasses = {
    blue: 'bg-blue-500 hover:bg-blue-700 active:bg-blue-800',
    red: 'bg-red-500 hover:bg-red-600 active:bg-red-700',
    green: 'bg-green-600 hover:bg-green-700 active:bg-green-800',
    orange: 'bg-orange-500 hover:bg-orange-600 active:bg-orange-700',
    yellow: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700',
    gray: 'bg-gray-500 hover:bg-gray-600 active:bg-gray-700',
    black: 'bg-black hover:bg-gray-800 active:bg-gray-900',
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

export default DropdownButton;
