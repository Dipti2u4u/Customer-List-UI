import React from "react";

const SearchBar = ({ query, setQuery }) => (
  <input
    className="search"
    placeholder="Search name / email / phone"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
  />
);

export default SearchBar;
