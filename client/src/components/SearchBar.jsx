// components/SearchBar.jsx
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Notify the parent component of the query change
  };

  return (
    <div className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
      {/* Search Icon */}
      <SearchIcon className="text-gray-500" />

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder || "Search..."}
        className="bg-transparent focus:outline-none w-full text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
