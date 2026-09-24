import { create } from "zustand";
import type { CreateTodo, EditTodo, Todo } from "../types/todo.type";
import type { TodoAnalytics } from "../types/todoAnalytics.type";
import { api } from "../../../api/axios";

type TodoStore = {
  todos: Todo[];
  analytics: TodoAnalytics | null;
  loading: boolean;
  loadingIds: string[];
  totalPages: number;

  getTodos: (params: URLSearchParams) => Promise<void>;
  createTodo: (data: CreateTodo, onClose: () => void) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (data: EditTodo, onClose: () => void) => Promise<void>;
  createTestTodos: () => Promise<void>;
  getTodoAnalytics: () => Promise<void>;
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
    } finally {
      set({ loading: false });
    }
  },

  createTodo: async (data, onClose) => {
    set({ loading: true });

    try {
      const { data: todo } = await api.post<Todo>("/todos", data);

      set((state) => ({
        todos: [...state.todos, todo],
      }));

      onClose();
    } catch (error) {
      console.error("Failed to create todo:", error);
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
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
      }));
    }
  },

  editTodo: async (data, onClose) => {
    const { id, ...dataToEdit } = data;

    set((state) => ({ loadingIds: [...state.loadingIds, id] }));

    try {
      await api.patch(`/todos/${id}`, data);
      set((state) => ({
        todos: state.todos.map((item) =>
          item.id === id ? { ...item, ...dataToEdit } : item,
        ),
      }));

      onClose();
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      set({ loading: false });
      set((state) => ({
        loading: false,
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
    } catch (error) {
      console.error("Failed to create test todos:", error);
    } finally {
      set({ loading: false });
    }
  },
  getTodoAnalytics: async () => {
    try {
      const { data: analytics } = await api<TodoAnalytics>("/todos/analytics");
      set({ analytics });
    } catch (error) {
      console.error("Failed to get todo analytics:", error);
    }
  },
}));
