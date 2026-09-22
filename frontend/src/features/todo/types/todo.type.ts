export type Category = "study" | "work" | "personal" | "other";

export type Status = "todo" | "in-progress" | "done";

export type Priority = "low" | "medium" | "high";

export type CategoryFilter = Category | "all";

export type StatusFilter = Status | "all";

export type PriorityFilter = Priority | "all";

export type Todo = {
  id: string;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
};

export type CreateTodo = Omit<Todo, "id" | "dueDate" | "createdAt">;

export type EditTodo = Omit<Todo, "dueDate" | "createdAt">;

