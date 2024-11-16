import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar';

const MyCourses = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample data for courses (replace with your actual data source)
  const courses = [
    { id: 1, name: 'Math 101' },
    { id: 2, name: 'History 201' },
    { id: 3, name: 'Physics 301' },
    { id: 4, name: 'Biology 101' },
    { id: 5, name: 'Computer Science 101' },
  ];

  // Filter courses based on the search query
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Welcome to the Student My Courses Page</h1>
      
      {/* Search Bar */}
      <SearchBar
        placeholder="Search for a course..."
        onSearch={setSearchQuery} // Update search query when user types
      />
      
      {/* Display the filtered list of courses */}
      <div>
        {filteredCourses.length > 0 ? (
          <ul>
            {filteredCourses.map((course) => (
              <li key={course.id} style={{ margin: '10px 0', fontSize: '18px' }}>
                {course.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
