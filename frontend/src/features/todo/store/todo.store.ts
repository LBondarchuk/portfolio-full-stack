import { create } from "zustand";
import type { CreateTodo, EditTodo, Todo } from "../types/todo.type";
type TodoStore = {
  todos: Todo[];
  loading: boolean;
  totalPages: number;
  setLoading: (value: boolean) => void;
  getTodos: (params: URLSearchParams) => Promise<void>;
  createTodo: (data: CreateTodo) => Promise<void>;
  deleteTodo: (id: string) => void;
  editTodo: (data: EditTodo) => void;
  getTestTodos: () => void;
};

export type GetTodosResponse = {
  todos: Todo[];
  total: number;
  totalPages: number;
  currentPage: number;
};

const todoUrl = "http://localhost:8800/api/todos";

export const useTodo = create<TodoStore>((set) => ({
  todos: [],
  loading: false,
  totalPages: 1,
  setLoading: (value) => {
    console.log(value);
  },
  getTodos: async (params) => {
    try {
      const response = await fetch(`${todoUrl}?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const { totalPages, todos }: GetTodosResponse = await response.json();
      console.log("resp", totalPages);

      set({
        todos,
        totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  },
  createTodo: async (data) => {
    try {
      const response = await fetch(todoUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create todo");
      }

      const todo = await response.json();
      console.log(todo, "new todo");

      set((state) => ({
        todos: [...state.todos, todo],
      }));
    } catch (error) {
      console.error(error);
    }
  },

  deleteTodo: async (id) => {
    try {
      const response = await fetch(todoUrl + `/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error(`Todo: ${response.status}`);

      set((state) => ({ todos: state.todos.filter((item) => item.id !== id) }));
    } catch (error) {
      console.error("Failed to delete todos:", error);
    }
  },
  editTodo: async (data) => {
    const { id, ...dataToEdit } = data;

    try {
      const response = await fetch(todoUrl + `/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToEdit),
      });

      if (!response.ok) throw new Error(`Todo: ${response.status}`);
      set((state) => ({
        todos: state.todos.map((item) => {
          if (item.id === id) {
            return { ...item, ...dataToEdit };
          }
          return item;
        }),
      }));
    } catch (error) {
      console.error("Failed to update todos:", error);
    }
  },
  getTestTodos: async () => {
    try {
      const response = await fetch(todoUrl + "/createTestTodos");
      if (!response.ok) throw new Error("Failed to fetch todos");
      const { todos, totalPages } = await response.json();
      set({
        todos,
        totalPages,
      });
    } catch (error) {
      console.error(error);
    }
  },
}));
