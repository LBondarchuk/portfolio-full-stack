import { create } from "zustand";
import type { CreateTodo, EditTodo, Todo } from "../types/todo.type";
import type { TodoActivity, TodoAnalytics } from "../types/todoAnalytics.type";

import { api } from "../../../api/axios";

type TodoStore = {
  todos: Todo[];
  analytics: TodoAnalytics | null;
  todoActivity: TodoActivity[];
  loading: boolean;
  loadingIds: string[];
  totalPages: number;

  getTodos: (params: URLSearchParams) => Promise<void>;
  createTodo: (data: CreateTodo) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (data: EditTodo) => Promise<void>;
  createTestTodos: () => Promise<void>;
  getTodoAnalytics: () => Promise<void>;
  getTodoActivity: () => Promise<void>;
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
  analytics: null,
  todoActivity: [],
  loading: false,
  loadingIds: [],
  totalPages: 1,

  getTodos: async (params) => {
    set({ loading: true });

    try {
      const { data } = await api.get<GetTodosResponse>("/todos", {
        params,
      });

      set({
        todos: data.todos,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  createTodo: async (data) => {
    set({ loading: true });

    try {
      const { data: todo } = await api.post<Todo>("/todos", data);

      set((state) => ({
        todos: [...state.todos, todo],
      }));

      if (todo.status === "done") {
        await useTodo.getState().getTodoActivity();
      }
    } catch (error) {
      console.error("Failed to create todo:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteTodo: async (id) => {
    set((state) => ({
      loadingIds: state.loadingIds.includes(id)
        ? state.loadingIds
        : [...state.loadingIds, id],
    }));

    try {
      await api.delete(`/todos/${id}`);

      set((state) => ({
        todos: state.todos.filter((item) => item.id !== id),
      }));

      await useTodo.getState().getTodoActivity();
    } catch (error) {
      console.error("Failed to delete todo:", error);
      throw error;
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
      }));
    }
  },

  editTodo: async (data) => {
    const { id, ...dataToEdit } = data;

    set((state) => ({
      loadingIds: state.loadingIds.includes(id)
        ? state.loadingIds
        : [...state.loadingIds, id],
    }));

    try {
      const { data: updatedTodo } = await api.patch<Todo>(`/todos/${id}`, data);

      set((state) => ({
        todos: state.todos.map((item) => (item.id === id ? updatedTodo : item)),
      }));

    
      if ("status" in dataToEdit) {
        await useTodo.getState().getTodoActivity();
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
      throw error;
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter((item) => item !== id),
      }));
    }
  },

  createTestTodos: async () => {
    set({ loading: true });

    try {
      const response = await fetch(`${todoUrl}/createTestTodos`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to create test todos");
      }

      const { todos, totalPages }: GetTodosResponse = await response.json();

      set({
        todos,
        totalPages,
      });

      await useTodo.getState().getTodoActivity();
    } catch (error) {
      console.error("Failed to create test todos:", error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getTodoAnalytics: async () => {
    try {
      const { data: analytics } =
        await api.get<TodoAnalytics>("/todos/analytics");

      set({ analytics });
    } catch (error) {
      console.error("Failed to get todo analytics:", error);
      throw error;
    }
  },

  getTodoActivity: async () => {
    try {
      const { data: todoActivity } =
        await api.get<TodoActivity[]>("/todos/activity");

      set({ todoActivity });
    } catch (error) {
      console.error("Failed to get todo activity:", error);
      throw error;
    }
  },
}));
