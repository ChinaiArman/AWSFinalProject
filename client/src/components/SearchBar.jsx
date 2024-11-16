// components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Notify the parent component of the query change
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder={placeholder || 'Search...'}
        style={{
          padding: '10px',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          marginBottom: '20px',
        }}
      />
    </div>
  );
};

export default SearchBar;
