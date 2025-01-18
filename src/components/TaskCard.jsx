import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TaskCard = ({ task, onEdit, onDelete, onToggle, isDragging }) => {
  const navigate = useNavigate();

  // Map priority to colors
  const priorityColors = {
    High: "bg-red-100 border-red-400",
    Medium: "bg-yellow-100 border-yellow-400",
    Low: "bg-green-100 border-green-400",
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div
      className={`p-4 rounded-md shadow-md border ${
        priorityColors[task.priority]
      } ${isDragging ? "opacity-90" : "opacity-100"} ${
        task.completed ? "opacity-50" : ""
      }`}
    >
      {/* Title */}
      <div className="flex justify-between items-center mb-3">
        <h2
          className={`text-2xl font-bold ${
            task.completed ? "line-through text-gray-500" : "text-gray-900"
          }`}
        >
          {task.title}
        </h2>
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            task.priority === "High"
              ? "bg-red-500 text-white"
              : task.priority === "Medium"
              ? "bg-yellow-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p
          className={`text-base leading-relaxed font-bold italic ${
            task.completed ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Dates */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-1 uppercase">
          Dates
        </h4>
        <div className="space-y-1">
          <p className="text-xs">
            <span className="font-semibold text-blue-600">Created:</span>{" "}
            <span className="text-gray-700">{formatDate(task.createdAt)}</span>
          </p>
          <p className="text-xs">
            <span className="font-semibold text-purple-600">Updated:</span>{" "}
            <span className="text-gray-700">{formatDate(task.updatedAt)}</span>
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
        >
          View Details
        </button>
        <button
          onClick={() => onToggle(task.id)}
          className={`px-3 py-1 rounded-md ${
            task.completed
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          {task.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>
        <button
          onClick={() => onEdit(task.id)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// PropTypes validation
TaskCard.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    priority: PropTypes.oneOf(["High", "Medium", "Low"]).isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
    updatedAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]).isRequired,
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  isDragging: PropTypes.bool,
};

export default TaskCard;
