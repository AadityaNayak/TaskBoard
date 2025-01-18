import React, { useContext, useState, useEffect } from "react";
import TaskControls from "../components/TaskControls";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import TaskContext from "../context/TaskContext";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const HomePage = () => {
  const { taskList, addTask, editTask, removeTask, toggleCompletion } =
    useContext(TaskContext);
  const [filteredTasks, setFilteredTasks] = useState(taskList);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Sync filteredTasks with taskList whenever taskList changes
  useEffect(() => {
    setFilteredTasks(taskList);
  }, [taskList]);

  // Handle Filter
  const handleFilter = (status) => {
    if (status === "All") {
      setFilteredTasks(taskList);
    } else if (status === "Completed") {
      setFilteredTasks(taskList.filter((task) => task.completed));
    } else {
      setFilteredTasks(taskList.filter((task) => !task.completed));
    }
  };

  // Handle Sort
  const handleSort = (sortBy, order) => {
    const sortedTasks = [...filteredTasks];
    if (sortBy === "DateCreated") {
      sortedTasks.sort((a, b) =>
        order === "desc"
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortBy === "DateUpdated") {
      sortedTasks.sort((a, b) =>
        order === "desc"
          ? new Date(b.updatedAt) - new Date(a.updatedAt)
          : new Date(a.updatedAt) - new Date(b.updatedAt)
      );
    } else if (sortBy === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      sortedTasks.sort((a, b) =>
        order === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority]
      );
    }
    setFilteredTasks(sortedTasks);
  };

  // Handle Add Task
  const handleAddTask = (task) => {
    if (task.id) {
      editTask(task.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        updatedAt: new Date(),
      });
    } else {
      addTask(task.title, task.description, task.priority);
    }
    setTaskToEdit(null);
  };

  // Handle Edit Task
  const handleEditTask = (taskId) => {
    const task = taskList.find((t) => t.id === taskId);
    if (task) {
      setTaskToEdit(task);
      setIsModalOpen(true);
    }
  };

  // Handle Drag and Drop
  const handleDragEnd = (result) => {
    const { source, destination } = result;

    // Exit if dropped outside a valid area
    if (!destination) return;

    const reorderedTasks = Array.from(filteredTasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);

    setFilteredTasks(reorderedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Task Controls */}
      <TaskControls
        onFilter={handleFilter}
        onSort={handleSort}
        onAddTask={() => setIsModalOpen(true)}
      />

      {/* Drag and Drop Context */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks" type="group">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6"
            >
              <TransitionGroup component={null}>
                {filteredTasks.map((task, index) => (
                  <CSSTransition
                    key={task.id}
                    timeout={300}
                    classNames="task"
                  >
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white shadow-md rounded-md p-4 ${
                            snapshot.isDragging
                              ? "border-2 border-blue-500"
                              : ""
                          }`}
                        >
                          <TaskCard
                            task={task}
                            onEdit={handleEditTask}
                            onDelete={removeTask}
                            onToggle={toggleCompletion}
                          />
                        </div>
                      )}
                    </Draggable>
                  </CSSTransition>
                ))}
              </TransitionGroup>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setTaskToEdit(null);
        }}
        onSubmit={handleAddTask}
        taskToEdit={taskToEdit}
      />
    </div>
  );
};

export default HomePage;
