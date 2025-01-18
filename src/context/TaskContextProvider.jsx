import React, { useState, useEffect } from "react";
import TaskContext from "./TaskContext";
import { saveToStorage, loadFromStorage } from "../utils/localStorage";
import {
  createTask,
  updateTask,
  deleteTask,
  toggleTask,
} from "../utils/taskActions";

const TaskContextProvider = ({ children }) => {
  const [taskList, setTaskList] = useState([]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = loadFromStorage("tasks") || [];
    setTaskList(savedTasks);
  }, []);

  // Save tasks to localStorage whenever taskList changes
  useEffect(() => {
    saveToStorage("tasks", taskList);
  }, [taskList]);

  // Task manipulation functions
  const addTask = (title, description, priority) => {
    const newTask = createTask(title, description, priority);
    setTaskList((prev) => [...prev, newTask]);
  };

  const editTask = (taskId, updatedFields) => {
    const updatedTasks = updateTask(taskList, taskId, updatedFields); // Call utility
    setTaskList(updatedTasks); // Correctly update taskList
  };

  const removeTask = (taskId) => {
    const updatedTasks = deleteTask(taskList, taskId); // Call utility
    setTaskList(updatedTasks); // Correctly update taskList
  };

  const toggleCompletion = (taskId) => {
    const updatedTasks = toggleTask(taskList, taskId); // Call utility
    setTaskList(updatedTasks); // Correctly update taskList
  };

  return (
    <TaskContext.Provider
      value={{ taskList, addTask, editTask, removeTask, toggleCompletion }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
