import { afterEach, describe, expect, it, vi } from "vitest";
import { api } from "../../../../api/axios";
import { useTodo } from "../todo.store";
import { testTodo } from "./todo.test-data";

describe("deleteTodo", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    useTodo.setState({
      todos: [],
      loading: false,
      loadingIds: [],
    });
  });

  it("should delete todo", async () => {
    useTodo.setState({
      todos: [testTodo],
    });

    vi.spyOn(api, "delete").mockResolvedValue({});
    vi.spyOn(api, "get").mockResolvedValue({
      data: [],
    });

    await useTodo.getState().deleteTodo(testTodo.id);

    const stateTodo = useTodo
      .getState()
      .todos.find((item) => item.id === testTodo.id);

    expect(stateTodo).toBeUndefined();
  });

  it("should throw an error when deleting a todo fails", async () => {
    useTodo.setState({
      todos: [testTodo],
    });
    vi.spyOn(api, "delete").mockRejectedValue(
      new Error("Failed to delete todo"),
    );

    await expect(useTodo.getState().deleteTodo(testTodo.id)).rejects.toThrow(
      "Failed to delete todo",
    );
  });
});
