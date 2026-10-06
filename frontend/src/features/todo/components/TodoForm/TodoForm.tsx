// import { useForm } from "react-hook-form";
// import type { EditTodo } from "../../types/todo.type";

// import FormField from "../../../../components/form/FormField/FormField";
// import Select from "../../../../components/form/Select/Select";
// import Button from "../../../../components/buttons/Button/Button";
// import Input from "../../../../components/form/Input/Input";
// import SelectItem from "../../../../components/form/Select/SelectItem";
// import Loader from "../../../../components/Loader/Loader";

// import { useTodo } from "../../store/todo.store";

// import { MetaStyles } from "../TodoItem/TodoContent/TodoMeta/todoMeta.styles";

// import {
//   categories,
//   priorities,
//   statuses,
// } from "../../constants/todo.constants";

// import { useTodoForm } from "./useTodoForm";

// type Props = {
//   closeModal: () => void;
//   initialValues?: EditTodo;
// };

// export type TodoInputs = Pick<
//   EditTodo,
//   "title" | "description"
// >;

// const TodoForm = ({
//   closeModal,
//   initialValues,
// }: Props) => {
//   const {
//     openSelect,
//     setOpenSelect,

//     isChanged,
//     formSelects,
//     setFormSelects,
//     handleSubmitForm,
//   } = useTodoForm(
//     closeModal,
//     initialValues,
//   );

//   const { loading } = useTodo();

//   const {
//     register,
//     handleSubmit: hookFormSubmit,
//     formState: { errors },
//   } = useForm<TodoInputs>({
//     defaultValues: {
//       title: initialValues?.title ?? "",
//       description:
//         initialValues?.description ?? "",
//     },

//     mode: "onBlur",
//   });

//   return (
//     <form
//       className="grid gap-4"
//       onSubmit={hookFormSubmit(
//         handleSubmitForm,
//       )}
//     >
//       <FormField
//         name="title"
//         title="Titel"
//       >
//         <Input
//           {...register("title", {
//             required:
//               "Title is required.",

//             minLength: {
//               value: 3,
//               message:
//                 "Title must contain at least 3 characters.",
//             },

//             maxLength: {
//               value: 50,
//               message:
//                 "Title must not exceed 50 characters.",
//             },

//             validate: (value) =>
//               value.trim().length > 0 ||
//               "Title cannot contain only spaces.",
//           })}
//           id="title"
//           type="text"
//           placeholder="Enter task title"
//           aria-invalid={Boolean(
//             errors.title,
//           )}
//           className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
//         />

//         {errors.title && (
//           <p className="mt-1.5 text-xs text-danger">
//             {errors.title.message}
//           </p>
//         )}
//       </FormField>

//       <FormField
//         name="description"
//         title="Description"
//       >
//         <textarea
//           {...register("description", {
//             maxLength: {
//               value: 900,
//               message:
//                 "Description must not exceed 900 characters.",
//             },
//           })}
//           id="description"
//           rows={6}
//           placeholder="Enter task description"
//           aria-invalid={Boolean(
//             errors.description,
//           )}
//           className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
//         />

//         <div className="mt-1.5 flex items-center justify-between">
//           {errors.description ? (
//             <p className="text-xs text-danger">
//               {errors.description.message}
//             </p>
//           ) : (
//             <span />
//           )}

//           <span className="text-xs text-text-muted">
//             Max. 900 characters
//           </span>
//         </div>
//       </FormField>
//       <FormField
//         name="category"
//         title="Category"
//       >
//         <Select
//           value={formSelects.category}
//           isOpen={
//             openSelect === "category"
//           }
//           onOpen={() =>
//             setOpenSelect("category")
//           }
//           onClose={() =>
//             setOpenSelect(null)
//           }
//           buttonClassName={
//             MetaStyles.category[
//               formSelects.category
//             ]
//           }
//         >
//           {categories.map(
//             (category) => (
//               <SelectItem
//                 key={category}
//                 className={
//                   MetaStyles.category[
//                     category
//                   ]
//                 }
//                 onClick={() => {
//                   setFormSelects(
//                     (prev) => ({
//                       ...prev,
//                       category,
//                     }),
//                   );

//                   setOpenSelect(null);
//                 }}
//               >
//                 {category}
//               </SelectItem>
//             ),
//           )}
//         </Select>
//       </FormField>
//       <FormField
//         name="status"
//         title="Status"
//       >
//         <Select
//           value={formSelects.status}
//           isOpen={
//             openSelect === "status"
//           }
//           onOpen={() =>
//             setOpenSelect("status")
//           }
//           onClose={() =>
//             setOpenSelect(null)
//           }
//           buttonClassName={
//             MetaStyles.status[
//               formSelects.status
//             ]
//           }
//         >
//           {statuses.map((status) => (
//             <SelectItem
//               key={status}
//               className={
//                 MetaStyles.status[
//                   status
//                 ]
//               }
//               onClick={() => {
//                 setFormSelects(
//                   (prev) => ({
//                     ...prev,
//                     status,
//                   }),
//                 );

//                 setOpenSelect(null);
//               }}
//             >
//               {status}
//             </SelectItem>
//           ))}
//         </Select>
//       </FormField>

//       <FormField
//         name="priority"
//         title="Priority"
//       >
//         <Select
//           value={formSelects.priority}
//           isOpen={
//             openSelect === "priority"
//           }
//           onOpen={() =>
//             setOpenSelect("priority")
//           }
//           onClose={() =>
//             setOpenSelect(null)
//           }
//           buttonClassName={
//             MetaStyles.priority[
//               formSelects.priority
//             ]
//           }
//         >
//           {priorities.map(
//             (priority) => (
//               <SelectItem
//                 key={priority}
//                 className={
//                   MetaStyles.priority[
//                     priority
//                   ]
//                 }
//                 onClick={() => {
//                   setFormSelects(
//                     (prev) => ({
//                       ...prev,
//                       priority,
//                     }),
//                   );

//                   setOpenSelect(null);
//                 }}
//               >
//                 {priority}
//               </SelectItem>
//             ),
//           )}
//         </Select>
//       </FormField>

//       <Button
//         type="submit"
//         disabled={!isChanged}
//         className={
//           !isChanged
//             ? "bg-gray-dark/80"
//             : ""
//         }
//       >
//         {loading ? (
//           <Loader />
//         ) : initialValues ? (
//           "Edit Todo"
//         ) : (
//           "Add Todo"
//         )}
//       </Button>
//     </form>
//   );
// };

// export default TodoForm;

