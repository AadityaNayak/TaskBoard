// Generate a unique task ID
export const generateTaskId = () => Date.now();

// Create a new task
export const createTask = (title, description, priority = "Low") => ({
  id: generateTaskId().toString(),
  title,
  description,
  priority,
  completed: false,
  createdAt: new Date(),
  updatedAt: new Date(),
});

// Update a task
export const updateTask = (taskList, taskId, updatedFields) => {
  return taskList.map((task) =>
    task.id === taskId
      ? { ...task, ...updatedFields, updatedAt: new Date() }
      : task
  );
};

// Delete a task
export const deleteTask = (taskList, taskId) => {
  return taskList.filter((task) => task.id !== taskId);
};

// Toggle task completion
export const toggleTask = (taskList, taskId) => {
  return taskList.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
};
