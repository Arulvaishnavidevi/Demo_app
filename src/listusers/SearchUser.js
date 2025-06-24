// components/SearchUser.js
import React from 'react';
// import './searchuser.css'; // your style if needed

function SearchUser({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-user-container">
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}

export default SearchUser;
