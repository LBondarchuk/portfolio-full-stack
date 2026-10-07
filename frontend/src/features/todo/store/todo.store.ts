import { create } from "zustand";
import type { CreateTodo, EditTodo, Todo } from "../types/todo.type";
import type { TodoActivity, TodoAnalytics } from "../types/todoAnalytics.type";

import { api } from "../../../api/axios";

type TodoStore = {
  todos: Todo[];
  analytics: TodoAnalytics | null;
  todoActivity: TodoActivity[];
  loading: boolean;
  analyticsLoading: boolean;
  loadingIds: Todo["id"][];
  totalPages: number;

  getTodos: (params: URLSearchParams, signal?: AbortSignal) => Promise<void>;
  createTodo: (data: CreateTodo) => Promise<void>;
  deleteTodo: (id: Todo["id"]) => Promise<void>;
  editTodo: (data: EditTodo) => Promise<void>;
  createTestTodos: () => Promise<void>;
  getTodoAnalytics: (signal?: AbortSignal) => Promise<void>;
  getTodoActivity: (signal?: AbortSignal) => Promise<void>;
};

export type GetTodosResponse = {
  todos: Todo[];
  total: number;
  totalPages: number;
  currentPage: number;
};

const todoUrl = "http://localhost:8800/api/todos";
let latestTodosRequest = 0;
let latestAnalyticsRequest = 0;
let latestTodoActivityRequest = 0;

export const useTodo = create<TodoStore>((set) => ({
  todos: [],
  analytics: null,
  todoActivity: [],
  loading: false,
  analyticsLoading: false,
  loadingIds: [],
  totalPages: 1,

  getTodos: async (params, signal) => {
    const requestId = ++latestTodosRequest;
    set({ loading: true });

    try {
      const { data } = await api.get<GetTodosResponse>("/todos", {
        params,
        signal,
      });

      if (requestId === latestTodosRequest) {
        set({
          todos: data.todos,
          totalPages: data.totalPages,
        });
      }
    } catch (error) {
      if (!signal?.aborted) console.error("Failed to fetch todos:", error);
      throw error;
    } finally {
      if (requestId === latestTodosRequest) set({ loading: false });
    }
  },

  createTodo: async (data) => {
    set({ loading: true ,loadingIds:['create']});

    try {
      const { data: todo } = await api.post<Todo>("/todos", data);

      set((state) => ({
        todos: [todo, ...state.todos],
      }));

      if (todo.status === "done") {
        await useTodo.getState().getTodoActivity();
      }
    } catch (error) {
      console.error("Failed to create todo:", error);
      throw error;
    } finally {
      set({ loading: false,loadingIds:[] });
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

  getTodoAnalytics: async (signal) => {
    const requestId = ++latestAnalyticsRequest;
    set({ analyticsLoading: true });

    try {
      const { data: analytics } =
        await api.get<TodoAnalytics>("/todos/analytics", { signal });

      if (requestId === latestAnalyticsRequest) set({ analytics });
    } catch (error) {
      if (!signal?.aborted) console.error("Failed to get todo analytics:", error);
      throw error;
    } finally {
      if (requestId === latestAnalyticsRequest) set({ analyticsLoading: false });
    }
  },

  getTodoActivity: async (signal) => {
    const requestId = ++latestTodoActivityRequest;
    try {
      const { data: todoActivity } =
        await api.get<TodoActivity[]>("/todos/activity", { signal });

      if (requestId === latestTodoActivityRequest) set({ todoActivity });
    } catch (error) {
      if (!signal?.aborted) console.error("Failed to get todo activity:", error);
      throw error;
    }
  },
}));
