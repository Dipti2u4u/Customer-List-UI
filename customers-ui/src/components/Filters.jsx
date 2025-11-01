import React from "react";
import { Filter } from "lucide-react";
import "../styles/styles.css";

const Filters = () => (
  <div className="filter-wrapper">
    <div className="filter-icon-container">
      <Filter size={16} color="#666" className="filter-icon" />
      <select className="filter-select">
        <option>Add Filters</option>
        <option>Filter 1</option>
        <option>Filter 2</option>
        <option>Filter 3</option>
        <option>Filter 4</option>
      </select>
    </div>
  </div>
);

export default Filters;

