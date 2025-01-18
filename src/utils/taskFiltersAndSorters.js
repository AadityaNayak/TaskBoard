// Filter tasks by status (All, Completed, Incomplete)
export const filterByStatus = (taskList, status) => {
    if (status === "Completed") {
      return taskList.filter((task) => task.completed);
    } else if (status === "Incomplete") {
      return taskList.filter((task) => !task.completed);
    }
    return taskList; // "All" status
  };
  
  // Sort tasks by creation date (newest first)
  export const sortByCreationDate = (taskList, order = "desc") => {
    return [...taskList].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return order === "desc" ? dateB - dateA : dateA - dateB;
    });
  };
  
  // Sort tasks by priority (High > Medium > Low)
  export const sortByPriority = (taskList) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return [...taskList].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };
  