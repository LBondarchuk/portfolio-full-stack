import type { Todo } from "../../types/todo.type";
import type { TodoAnalytics } from "../../types/todoAnalytics.type";

  export const testTodo: Todo = {
    id: "1",
    title: "Learn testing",
    description: "My first test",
    category: "study",
    status: "todo",
    priority: "high",
    createdAt: "2026-10-08T10:00:00.000Z",
    completedAt: null,
  };

 
export const testAnalytics: TodoAnalytics = {
  summary: {
    total: 10,
    completed: 4,
    inProgress: 3,
    highPriority: 2,
    completionRate: 40,
  },
  status: [
    { name: "todo", value: 3 },
    { name: "in-progress", value: 3 },
    { name: "done", value: 4 },
  ],
  categories: [
    { name: "study", value: 5 },
    { name: "work", value: 3 },
    { name: "personal", value: 2 },
  ],
  priorities: [
    { name: "high", value: 2 },
    { name: "medium", value: 5 },
    { name: "low", value: 3 },
  ],
  weeklyCompletion: [
    { day: "Mon", value: 2 },
    { day: "Tue", value: 1 },
    { day: "Wed", value: 1 },
  ],
};
  