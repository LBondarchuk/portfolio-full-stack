import type {
  Category,
  Priority,
  Status,
} from "../../../../types/todo.type";

export const statusStyles: Record<Status, string> = {
  todo: "bg-[var(--todo-status-todo-bg)] text-[var(--todo-status-todo-text)] hover:brightness-95 dark:hover:brightness-110",

  "in-progress":
    "bg-[var(--todo-status-progress-bg)] text-[var(--todo-status-progress-text)] hover:brightness-95 dark:hover:brightness-110",

  done: "bg-[var(--todo-status-done-bg)] text-[var(--todo-status-done-text)] hover:brightness-95 dark:hover:brightness-110",
};

export const priorityStyles: Record<Priority, string> = {
  low: "bg-[var(--todo-priority-low-bg)] text-[var(--todo-priority-low-text)] hover:brightness-95 dark:hover:brightness-110",

  medium:
    "bg-[var(--todo-priority-medium-bg)] text-[var(--todo-priority-medium-text)] hover:brightness-95 dark:hover:brightness-110",

  high: "bg-[var(--todo-priority-high-bg)] text-[var(--todo-priority-high-text)] hover:brightness-95 dark:hover:brightness-110",
};

export const categoryStyles: Record<Category, string> = {
  study:
    "bg-[var(--todo-category-study-bg)] text-[var(--todo-category-study-text)] hover:brightness-95 dark:hover:brightness-110",

  work:
    "bg-[var(--todo-category-work-bg)] text-[var(--todo-category-work-text)] hover:brightness-95 dark:hover:brightness-110",

  personal:
    "bg-[var(--todo-category-personal-bg)] text-[var(--todo-category-personal-text)] hover:brightness-95 dark:hover:brightness-110",

  other:
    "bg-[var(--todo-category-other-bg)] text-[var(--todo-category-other-text)] hover:brightness-95 dark:hover:brightness-110",
};

export const MetaStyles = {
  category: categoryStyles,
  priority: priorityStyles,
  status: statusStyles,
};
