import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import TaskCard from "./TaskCard"; 

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();
const mockOnToggle = vi.fn();

const mockTask = {
  id: 1,
  title: "Test Task",
  description: "This is a test description.",
  priority: "High",
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("TaskCard Component", () => {

    // Task display test
  test("renders task title and description", () => {
    render(
      <MemoryRouter>
        <TaskCard
          task={mockTask}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("This is a test description.")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

// Task toggle test
  test("calls onToggle when Mark Complete is clicked", () => {
    render(
      <MemoryRouter>
        <TaskCard
          task={mockTask}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Mark Complete"));
    expect(mockOnToggle).toHaveBeenCalledWith(mockTask.id);
  });

  // Task edit test
  test("calls onEdit when Edit is clicked", () => {
    render(
      <MemoryRouter>
        <TaskCard
          task={mockTask}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Edit"));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTask.id);
  });

  // Task delete test
  test("calls onDelete when Delete is clicked", () => {
    render(
      <MemoryRouter>
        <TaskCard
          task={mockTask}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          onToggle={mockOnToggle}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
