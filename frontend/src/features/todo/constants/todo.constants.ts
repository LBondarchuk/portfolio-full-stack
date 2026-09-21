import type {
  Category,
  CategoryFilter,
  Priority,
  PriorityFilter,
  Status,
  StatusFilter,
} from "../types/todo.type";

export const categories: Category[] = [
  "other",
  "personal",
  "study",
  "work",
];

export const statuses: Status[] = [
  "todo",
  "in-progress",
  "done",
];

export const priorities: Priority[] = [
  "low",
  "medium",
  "high",
];

export const categoryFilters: CategoryFilter[] = [
  "all",
  ...categories,
];

export const statusFilters: StatusFilter[] = [
  "all",
  ...statuses,
];

export const priorityFilters: PriorityFilter[] = [
  "all",
  ...priorities,
];