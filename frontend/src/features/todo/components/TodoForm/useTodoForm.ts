// import { useState } from "react";
// import type {
//   Category,
//   CreateTodo,
//   EditTodo,
//   Priority,
//   Status,
// } from "../../types/todo.type";
// import { toast } from "react-toastify";
// import { useTodo } from "../../store/todo.store";
// import type { TodoInputs } from "./TodoForm";

// type SelectName = "category" | "status" | "priority";
// type FormFields = Pick<CreateTodo, "title" | "description">;
// const defaultInputs: FormFields = { title: "", description: "" };
// const defaultSelects: Selects = {
//   category: "study",
//   status: "todo",
//   priority: "medium",
// };
// type Selects = {
//   category: Category;
//   status: Status;
//   priority: Priority;
// };

// export const useTodoForm = (
//   closeModal: () => void,
//   initialValues?: EditTodo,
// ) => {
//   const [openSelect, setOpenSelect] = useState<SelectName | null>(null);
//   const { createTodo, editTodo } = useTodo();

//   const [form, setForm] = useState<FormFields>(
//     initialValues
//       ? {
//           title: initialValues.title ?? "",
//           description: initialValues.description ?? "",
//         }
//       : defaultInputs,
//   );

//   const [formSelects, setFormSelects] = useState<Selects>(
//     initialValues
//       ? {
//           category: initialValues.category ?? defaultSelects.category,
//           status: initialValues.status ?? defaultSelects.status,
//           priority: initialValues.priority ?? defaultSelects.priority,
//         }
//       : defaultSelects,
//   );

//   const isChanged = initialValues
//     ? form.title !== initialValues.title ||
//       form.description !== initialValues.description ||
//       formSelects.category !== initialValues.category ||
//       formSelects.status !== initialValues.status ||
//       formSelects.priority !== initialValues.priority
//     : form.title.trim() !== "";

//   const handleSubmitForm = async (
//     data: TodoInputs,
//   ) => {
   

//     try {
//       if (initialValues) {
//         await editTodo({
//           id: initialValues.id,
//           ...form,
//           ...formSelects,
//           ...data
//         });
//       } else {
//         await createTodo({
//           ...form,
//           ...formSelects,
//           ...data
//         });
//       }

//       setForm(defaultInputs);
//       setFormSelects(defaultSelects);
//       closeModal();

//       toast.success(
//         initialValues
//           ? "Todo updated successfully"
//           : "Todo created successfully",
//       );
//     } catch {
//       toast.error(
//         initialValues ? "Failed to update todo" : "Failed to create todo",
//       );
//     }
//   };

//   return {
//     openSelect,
//     setOpenSelect,
//     isChanged,
//     formSelects,
//     setFormSelects,
//     handleSubmitForm,
//   };
// };
