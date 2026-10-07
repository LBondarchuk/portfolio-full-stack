import { useState } from "react";
import type {
  EditTodo,
  Category,
  Priority,
  Status,
} from "../../types/todo.type";
import { toast } from "react-toastify";
import { useTodo } from "../../store/todo.store";
import type { TodoInputs } from "./TodoForm";

type SelectName = "category" | "status" | "priority";
type Selects = {
  category: Category;
  status: Status;
  priority: Priority;
};

const defaultSelects: Selects = {
  category: "study",
  status: "todo",
  priority: "medium",
};

export const useTodoForm = (
  closeModal: () => void,
  initialValues?: EditTodo,
  isDirty = false,
) => {
  const [openSelect, setOpenSelect] = useState<SelectName | null>(null);

  const { createTodo, editTodo } = useTodo();

  const [formSelects, setFormSelects] = useState<Selects>(
    initialValues
      ? {
          category: initialValues.category ?? defaultSelects.category,

          status: initialValues.status ?? defaultSelects.status,

          priority: initialValues.priority ?? defaultSelects.priority,
        }
      : defaultSelects,
  );

  const selectsChanged = initialValues
    ? formSelects.category !== initialValues.category ||
      formSelects.status !== initialValues.status ||
      formSelects.priority !== initialValues.priority
    : true;

  const isChanged = initialValues ? isDirty || selectsChanged : isDirty;

  const handleSubmitForm = async (data: TodoInputs) => {
    try {
      if (initialValues) {
        await editTodo({
          id: initialValues.id,
          ...data,
          ...formSelects,
        });
      } else {
        await createTodo({
          ...data,
          ...formSelects,
        });
      }

      setFormSelects(defaultSelects);

      closeModal();

      toast.success(
        initialValues
          ? "Todo updated successfully"
          : "Todo created successfully",
      );
    } catch {
      toast.error(
        initialValues ? "Failed to update todo" : "Failed to create todo",
      );
    }
  };

  return {
    openSelect,
    setOpenSelect,
    isChanged,
    formSelects,
    setFormSelects,
    handleSubmitForm,
  };
};
