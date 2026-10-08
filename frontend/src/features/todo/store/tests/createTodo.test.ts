import { describe, it, expect, vi, afterEach } from "vitest";
import type { CreateTodo } from "../../types/todo.type";
import { api } from "../../../../api/axios";
import { useTodo } from "../todo.store";
import { testTodo } from "./todo.test-data";

describe("createTodo", () => {
  const createData: CreateTodo = {
    title: "Learn testing",
    description: "My first test",
    category: "study",
    status: "todo",
    priority: "high",
  };

  afterEach(() => {
    vi.restoreAllMocks();

    useTodo.setState({
      todos: [],
      loading: false,
      loadingIds: [],
    });
  });

  it("should create a todo", async () => {
    vi.spyOn(api, "post").mockResolvedValue({
      data: testTodo,
    });

    const { createTodo } = useTodo.getState();

    await createTodo(createData);

    const { todos } = useTodo.getState();

    expect(todos[0]).toEqual(testTodo);
    expect(api.post).toHaveBeenCalledWith("/todos", createData);
  });

  it("should throw an error when creating a todo fails", async () => {
    vi.spyOn(api, "post").mockRejectedValue(new Error("Failed to create todo"));

    const { createTodo } = useTodo.getState();

    await expect(createTodo(createData)).rejects.toThrow(
      "Failed to create todo",
    );
  });
});
