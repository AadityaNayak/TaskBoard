import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskContext from "../context/TaskContext";
import TaskModal from "../components/TaskModal";

const TaskDetailPage = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const navigate = useNavigate(); // For navigation
  const { taskList, toggleCompletion, removeTask, editTask } =
    useContext(TaskContext);

  const [task, setTask] = useState(null); // Task state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Find the task by ID and update state
  useEffect(() => {
    const existingTask = taskList.find((t) => t.id.toString() === id.toString());
    setTask(existingTask);
    if (!existingTask) {
      navigate("/"); // Redirect if task not found
    }
  }, [id, taskList, navigate]);

  // Handle task updates
  const handleTaskUpdate = (updatedTask) => {
    editTask(task.id, {
      ...task,
      ...updatedTask,
      updatedAt: new Date(),
    });
    setTask({
      ...task,
      ...updatedTask,
      updatedAt: new Date(),
    }); // Update local state
    setIsModalOpen(false); // Close modal
  };

  if (!task) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-700">Redirecting to Home...</p>
      </div>
    ); // Fallback during redirection
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">{task.title}</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-500 hover:underline"
          >
            Go Back
          </button>
        </div>

        {/* Task Details */}
        <div className="mt-6 space-y-4">
          <p className="text-gray-700">
            <span className="font-semibold">Description:</span> {task.description || "No description provided"}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Priority:</span>{" "}
            <span
              className={`inline-block px-2 py-1 rounded ${
                task.priority === "High"
                  ? "bg-red-100 text-red-600"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-green-100 text-green-600"
              }`}
            >
              {task.priority}
            </span>
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(task.createdAt).toLocaleString()}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Updated At:</span>{" "}
            {new Date(task.updatedAt).toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => toggleCompletion(task.id)}
            className={`px-4 py-2 rounded-md font-semibold ${
              task.completed
                ? "bg-green-500 text-white hover:bg-green-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
          </button>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal for editing
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Edit Task
          </button>
          <button
            onClick={() => {
              removeTask(task.id);
              navigate("/"); // Navigate to Home after deletion
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Delete Task
          </button>
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTaskUpdate}
        taskToEdit={task}
      />
    </div>
  );
};

export default TaskDetailPage;
