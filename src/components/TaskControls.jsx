import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const TaskControls = ({ onFilter, onSort, onAddTask }) => {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("DateCreated");
  const [order, setOrder] = useState("desc"); // "asc" or "desc"

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilter(value);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSort(value);
    onSort(value, order);
  };

  const toggleOrder = () => {
    const newOrder = order === "asc" ? "desc" : "asc";
    setOrder(newOrder);
    onSort(sort, newOrder);
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-gray-100 px-4 py-2 gap-4">
      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={handleFilterChange}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Incomplete">Incomplete</option>
      </select>

      {/* Sort Dropdown */}
      <div className="flex items-center space-x-4">
        <select
          value={sort}
          onChange={handleSortChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="DateCreated">Sort by Created Date</option>
          <option value="DateUpdated">Sort by Updated Date</option>
          <option value="Priority">Sort by Priority</option>
        </select>

        {/* Toggle Order Button */}
        <button
          onClick={toggleOrder}
          className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
        >
          {order === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {/* Add Task Button */}
      <button
        onClick={onAddTask}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        + Add Task
      </button>
    </div>
  );
};

TaskControls.propTypes = {
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};

export default TaskControls;
