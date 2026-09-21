import type {
  Category,
  Priority,
  Status,
} from "../../../../types/todo.type";

export const statusStyles: Record<Status, string> = {
  todo: "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800",

  "in-progress":
    "bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-800",

  done: "bg-teal-50 text-teal-600 hover:bg-teal-50 hover:text-teal-800 hover:shadow-sm",
};

export const priorityStyles: Record<Priority, string> = {
  low: "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800",

  medium:
    "bg-orange-50 text-orange-600 hover:bg-orange-50 hover:text-orange-800 hover:shadow-sm",

  high: "bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800",
};

export const categoryStyles: Record<Category, string> = {
  study:
    "bg-violet-100 text-violet-600 hover:bg-violet-200 hover:text-violet-800",

  work:
    "bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-800 hover:shadow-sm",

  personal:
    "bg-pink-100 text-pink-600 hover:bg-pink-200 hover:text-pink-800",

  other:
    "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800",
};

export const MetaStyles = {
  category: categoryStyles,
  priority: priorityStyles,
  status: statusStyles,
};
