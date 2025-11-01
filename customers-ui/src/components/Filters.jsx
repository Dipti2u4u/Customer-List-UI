import React from "react";

const Filters = () => (
  <div className="filter-group">
    <select>
      <option>All Scores</option>
      <option>0 - 25</option>
      <option>26 - 50</option>
      <option>51 - 75</option>
      <option>76 - 100</option>
    </select>

    <select>
      <option>All AddedBy</option>
      <option>user1</option>
      <option>user2</option>
      <option>user3</option>
    </select>
  </div>
);

export default Filters;
