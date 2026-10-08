import { afterEach, describe, expect, it, vi } from "vitest";
import { api } from "../../../../api/axios";
import { testTodo } from "./todo.test-data";
import { useTodo } from "../todo.store";
import type { EditTodo } from "../../types/todo.type";

describe("update todo", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    useTodo.setState({
      todos: [],
      loading: false,
      loadingIds: [],
    });
  });
  const dataToEdit: EditTodo = {
    id: testTodo.id,
    title: "Test Title",
  };
  useTodo.setState({ todos: [testTodo] });

  const data = { ...testTodo, ...dataToEdit };

  it("should update todo", async () => {
    vi.spyOn(api, "patch").mockResolvedValue({ data });
    await useTodo.getState().editTodo(dataToEdit);

    expect(useTodo.getState().todos[0]).toEqual(data);
    expect(api.patch).toHaveBeenCalledWith(`/todos/${testTodo.id}`, dataToEdit);
  });

  it("should throw an error when updating a todo fails", async () => {
    vi.spyOn(api, "patch").mockRejectedValue(
      new Error("Failed to update todo"),
    );

    await expect(useTodo.getState().editTodo(dataToEdit)).rejects.toThrow(
      "Failed to update todo",
    );
  });
});
