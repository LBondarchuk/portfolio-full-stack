import { afterEach, describe, expect, it, vi } from "vitest";
import { useTodo } from "../todo.store";
import { testTodo } from "./todo.test-data";
import { api } from "../../../../api/axios";

describe("get todos", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    useTodo.setState({
      todos: [],
      loading: false,
      loadingIds: [],
    });
  });

  const searchParams = new URLSearchParams();

  it("should get todos", async () => {
    const testTodos = Array.from({ length: 4 }, (_, index) => ({
      ...testTodo,
      id: String(index),
    }));
    vi.spyOn(api, "get").mockResolvedValue({
      data: {
        todos: testTodos,
        total: 4,
        totalPages: 2,
        currentPage: 1,
      },
    });
  
    await useTodo.getState().getTodos(searchParams);
    expect(useTodo.getState().todos).toEqual(testTodos);
    expect(api.get).toHaveBeenCalledWith("/todos", { params: searchParams });
  });

  it("should throw an error when loading todos fails", async () => {
    vi.spyOn(api, "get").mockRejectedValue(new Error("Faild to load todos"));

    await expect(useTodo.getState().getTodos(searchParams)).rejects.toThrow(
      "Faild to load todos",
    );
  });
});
