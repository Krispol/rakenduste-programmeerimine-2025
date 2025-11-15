import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TodoItem } from "@/components/todo-item";

// Mock the server actions
vi.mock("@/app/todos/actions", () => ({
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

describe("TodoItem Component", () => {
  const mockTodo = {
    id: "123e4567-e89b-12d3-a456-426614174000",
    content: "Test todo item",
    created_at: "2025-11-15T10:00:00.000Z",
  };

  it("should render todo content", () => {
    render(
      <TodoItem
        id={mockTodo.id}
        content={mockTodo.content}
        created_at={mockTodo.created_at}
      />
    );

    expect(screen.getByText("Test todo item")).toBeInTheDocument();
  });

  it("should render formatted date", () => {
    render(
      <TodoItem
        id={mockTodo.id}
        content={mockTodo.content}
        created_at={mockTodo.created_at}
      />
    );

    const formattedDate = new Date(mockTodo.created_at).toLocaleString();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  it("should show Edit and Delete buttons", () => {
    render(
      <TodoItem
        id={mockTodo.id}
        content={mockTodo.content}
        created_at={mockTodo.created_at}
      />
    );

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("should enter edit mode when Edit button is clicked", async () => {
    render(
      <TodoItem
        id={mockTodo.id}
        content={mockTodo.content}
        created_at={mockTodo.created_at}
      />
    );

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test todo item")).toBeInTheDocument();
      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.getByText("Cancel")).toBeInTheDocument();
    });
  });

  it("should cancel edit mode when Cancel button is clicked", async () => {
    render(
      <TodoItem
        id={mockTodo.id}
        content={mockTodo.content}
        created_at={mockTodo.created_at}
      />
    );

    // Enter edit mode
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Cancel edit
    const cancelButton = await screen.findByText("Cancel");
    fireEvent.click(cancelButton);

    await waitFor(() => {
      expect(screen.getByText("Edit")).toBeInTheDocument();
      expect(screen.queryByText("Save")).not.toBeInTheDocument();
    });
  });

  it("should update input value when typing in edit mode", async () => {
    render(
      <TodoItem
        id={mockTodo.id}
        content={mockTodo.content}
        created_at={mockTodo.created_at}
      />
    );

    // Enter edit mode
    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    // Get input and change value
    const input = await screen.findByDisplayValue("Test todo item");
    fireEvent.change(input, { target: { value: "Updated todo" } });

    expect(screen.getByDisplayValue("Updated todo")).toBeInTheDocument();
  });

  it("should render as list item", () => {
    const { container } = render(
      <TodoItem
        id={mockTodo.id}
        content={mockTodo.content}
        created_at={mockTodo.created_at}
      />
    );

    const listItem = container.querySelector("li");
    expect(listItem).toBeInTheDocument();
    expect(listItem).toHaveClass("rounded-lg", "border", "border-gray-200");
  });
});
