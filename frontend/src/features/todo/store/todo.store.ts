import { create } from "zustand";
import type { CreateTodo, EditTodo, Todo } from "../types/todo.type";
type TodoStore = {
  todos: Todo[];
  getTodos: () => Promise<void>;
  createTodo: (data: CreateTodo) => Promise<void>;
  deleteTodo: (id: string) => void;
  editTodo: (data: EditTodo) => void;
};
const todoUrl = "http://localhost:8800/api/todos"

export const useTodo = create<TodoStore>((set) => ({
  todos: [],
  getTodos: async () => {
  try {
    const response = await fetch(todoUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    const todos: Todo[] = await response.json();

    set({
      todos,
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
        method:"DELETE"
      })
      if (!response.ok) throw new Error(`Todo: ${response.status}`)
      
      set((state) => ({ todos: state.todos.filter((item) => item.id !== id) }));
    } catch (error) {
      console.error("Failed to delete todos:", error);
    }

  },
  editTodo: (data) => {
    const { id, ...dataToEdit } = data;
    set((state) => ({
      todos: state.todos.map((item) => {
        if (item.id === id) {
          return { ...item, ...dataToEdit };
        }
        return item;
      }),
    }));
  },
}));
