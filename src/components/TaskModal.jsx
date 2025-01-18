import React, { useState, useEffect } from "react";

const TaskModal = ({ isOpen, onClose, onSubmit, taskToEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");

  // Reset fields when the modal is opened
  useEffect(() => {
    if (taskToEdit) {
      // Pre-fill values for editing
      setTitle(taskToEdit.title || "");
      setDescription(taskToEdit.description || "");
      setPriority(taskToEdit.priority || "Low");
    } else {
      // Reset values for creating a new task
      setTitle("");
      setDescription("");
      setPriority("Low");
    }
  }, [taskToEdit, isOpen]);

  const handleSubmit = () => {
    if (title.trim() === "") {
      alert("Title is required!");
      return;
    }
    onSubmit({ title, description, priority, id: taskToEdit?.id });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {taskToEdit ? "Edit Task" : "Create New Task"}
        </h2>

        {/* Task Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>

        {/* Task Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
          />
        </div>

        {/* Task Priority */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {taskToEdit ? "Save Changes" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
