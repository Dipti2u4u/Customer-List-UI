// import React from "react";

// const SearchBar = ({ query, setQuery }) => (
//   <input
//     className="search"
//     placeholder="Search name / email / phone"
//     value={query}
//     onChange={(e) => setQuery(e.target.value)}
//   />
// );

// export default SearchBar;
import React from "react";
import { Search } from "lucide-react"; // ✅ import icon
import "../styles/styles.css";

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-bar">
      <Search size={18} color="#888" className="search-icon" />
      <input
        type="text"
        placeholder="Search Customers..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
