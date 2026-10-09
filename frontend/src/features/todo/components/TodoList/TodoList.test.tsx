import { cleanup, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useTodo } from "../../store/todo.store";
import TodoList from "./TodoList";
import { testTodo } from "../../store/tests/todo.test-data";
import { getTodoLabel } from "../../utils/todoLabels";

describe("TodoList", () => {
  beforeEach(() => {
    useTodo.setState({
      todos: [],
      loading: false,
      loadingIds: [],
    });
    cleanup();
  });

  it("shows empty state when there are no todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Noch keine Aufgaben")).toBeTruthy();
  });

  it("shows skeletons while loading", () => {
    useTodo.setState({ loading: true });
    const { container } = render(<TodoList />);
    const skeletons = container.querySelectorAll("article");
    expect(skeletons).toHaveLength(5);
  });

  it("renders todos when they are present", () => {
    useTodo.setState({ todos: [testTodo] });

    render(<TodoList />);
    expect(screen.getByText(testTodo.title)).toBeTruthy();
    expect(screen.getByText(testTodo.description!)).toBeTruthy();
    expect(screen.getByText(getTodoLabel(testTodo.category))).toBeTruthy();
    expect(screen.getByText(getTodoLabel(testTodo.priority))).toBeTruthy();
    expect(screen.getByText(getTodoLabel(testTodo.status))).toBeTruthy();
    expect(screen.getByText(getTodoLabel(testTodo.status))).toBeTruthy();
  });
});
