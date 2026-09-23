import { create } from "zustand";
import type {
  CreateTodo,
  EditTodo,
  Todo,
} from "../types/todo.type";

type TodoStore = {
  todos: Todo[];
  loading: boolean;
  loadingIds: string[];
  totalPages: number;

  getTodos: (params: URLSearchParams) => Promise<void>;
  createTodo: (
    data: CreateTodo,
    onClose: () => void
  ) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (
    data: EditTodo,
    onClose: () => void
  ) => Promise<void>;
  createTestTodos: () => Promise<void>;
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
  loadingIds: [],
  totalPages: 1,

  getTodos: async (params) => {
    set({ loading: true });

    try {
      const response = await fetch(
        `${todoUrl}?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const {
        todos,
        totalPages,
      }: GetTodosResponse = await response.json();

      set({
        todos,
        totalPages,
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

      const todo: Todo = await response.json();

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
      const response = await fetch(`${todoUrl}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Todo: ${response.status}`);
      }

      set((state) => ({
        todos: state.todos.filter(
          (item) => item.id !== id
        ),
      }));
    } catch (error) {
      console.error("Failed to delete todo:", error);
    } finally {
      set((state) => ({
        loadingIds: state.loadingIds.filter(
          (loadingId) => loadingId !== id
        ),
      }));
    }
  },

  editTodo: async (data, onClose) => {
    const { id, ...dataToEdit } = data;

    set(state => ({  loadingIds: [...state.loadingIds, id] }));
  

    try {
      const response = await fetch(`${todoUrl}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToEdit),
      });

      if (!response.ok) {
        throw new Error(`Todo: ${response.status}`);
      }

      set((state) => ({
        todos: state.todos.map((item) =>
          item.id === id
            ? { ...item, ...dataToEdit }
            : item
        ),
      }));

      onClose();
    } catch (error) {
      console.error("Failed to update todo:", error);
    } finally {
      set({ loading: false });
       set(state => ({ loading: false, loadingIds: state.loadingIds.filter(item => item !== id) }));
    }
  },

  createTestTodos: async () => {
    set({ loading: true });

    try {
      const response = await fetch(
        `${todoUrl}/createTestTodos`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create test todos");
      }

      const {
        todos,
        totalPages,
      }: GetTodosResponse = await response.json();

      set({
        todos,
        totalPages,
      });
    } catch (error) {
      console.error(
        "Failed to create test todos:",
        error
      );
    } finally {
      set({ loading: false });
    }
  },
}));