import { useState } from "react";
import type {
  Category,
  CreateTodo,
  EditTodo,
  Priority,
  Status,
} from "../../types/todo.type";
import FormField from "../../../../components/form/FormField/FormField";
import Select from "../../../../components/form/Select/Select";
import Button from "../buttons/Button/Button";
import Input from "../../../../components/form/Input/Input";
import { useTodo } from "../../store/todo.store";
import SelectItem from "../../../../components/form/Select/SelectItem";
import { MetaStyles } from "../TodoItem/TodoContent/TodoMeta/todoMeta.styles";
import {
  categories,
  priorities,
  statuses,
} from "../../constants/todo.constants";
import Loader from "../../../../components/Loader/Loader";

type FormFilelds = Pick<CreateTodo, "title" | "description">;
type SelectName = "category" | "status" | "priority";

type Selects = {
  category: Category;
  status: Status;
  priority: Priority;
};

const defaultInputs: FormFilelds = { title: "", description: "" };
const defaultSelects: Selects = {
  category: "study",
  status: "todo",
  priority: "medium",
};

const TodoForm = ({
  closeModal,
  initialValues,
}: {
  closeModal: () => void;
  initialValues?: EditTodo;
}) => {
  const [openSelect, setOpenSelect] = useState<SelectName | null>(null);
  const { createTodo, editTodo, loading } = useTodo();

  const [form, setForm] = useState<FormFilelds>(
    initialValues
      ? {
          title: initialValues.title ?? "",
          description: initialValues.description ?? "",
        }
      : defaultInputs,
  );

  const [formSelects, setFormSelects] = useState<Selects>(
    initialValues
      ? {
          category: initialValues.category ?? defaultSelects.category,
          status: initialValues.status ?? defaultSelects.status,
          priority: initialValues.priority ?? defaultSelects.priority,
        }
      : defaultSelects,
  );

  const isChanged = initialValues
    ? form.title !== initialValues.title ||
      form.description !== initialValues.description ||
      formSelects.category !== initialValues.category ||
      formSelects.status !== initialValues.status ||
      formSelects.priority !== initialValues.priority
    : form.title.trim() !== "";

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (initialValues) {
      editTodo(
        {
          id: initialValues.id,
          ...form,
          ...formSelects,
        },
        closeModal,
      );
    } else {
      createTodo(
        {
          ...form,
          ...formSelects,
        },
        closeModal,
      );
    }

    setForm(defaultInputs);
    setFormSelects(defaultSelects);
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmitForm}>
      <FormField name="title" title="Titel">
        <Input
          id="title"
          maxLength={50}
          name="title"
          required
          type="text"
          value={form.title}
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              title: event.target.value,
            }))
          }
          placeholder="Enter task title"
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
        />
      </FormField>

      <FormField name="description" title="Description">
        <textarea
          id="description"
          name="description"
          rows={6}
          value={form.description}
          maxLength={900}
          placeholder="Enter task description"
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              description: event.target.value,
            }))
          }
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary"
        />
      </FormField>

      <FormField name={"categoty"} title={"Category"}>
        <Select
          value={formSelects.category}
          isOpen={openSelect === "category"}
          onOpen={() => setOpenSelect("category")}
          onClose={() => setOpenSelect(null)}
          buttonClassName={MetaStyles.category[formSelects.category]}
        >
          {categories.map((category) => (
            <SelectItem
              key={category}
              className={MetaStyles.category[category]}
              onClick={() => {
                setFormSelects((prev) => ({
                  ...prev,
                  category,
                }));
                setOpenSelect(null);
              }}
            >
              {category}
            </SelectItem>
          ))}
        </Select>
      </FormField>
      <FormField name={"status"} title={"Status"}>
        <Select
          value={formSelects.status}
          isOpen={openSelect === "status"}
          onOpen={() => setOpenSelect("status")}
          onClose={() => setOpenSelect(null)}
          buttonClassName={MetaStyles.status[formSelects.status]}
        >
          {statuses.map((status) => (
            <SelectItem
              key={status}
              className={MetaStyles.status[status]}
              onClick={() => {
                setFormSelects((prev) => ({
                  ...prev,
                  status,
                }));
                setOpenSelect(null);
              }}
            >
              {status}
            </SelectItem>
          ))}
        </Select>
      </FormField>
      <FormField name={"priority"} title={"Priority"}>
        <Select
          value={formSelects.priority}
          isOpen={openSelect === "priority"}
          onOpen={() => setOpenSelect("priority")}
          onClose={() => setOpenSelect(null)}
          buttonClassName={MetaStyles.priority[formSelects.priority]}
        >
          {priorities.map((priority) => (
            <SelectItem
              key={priority}
              className={MetaStyles.priority[priority]}
              onClick={() => {
                setFormSelects((prev) => ({
                  ...prev,
                  priority,
                }));
                setOpenSelect(null);
              }}
            >
              {priority}
            </SelectItem>
          ))}
        </Select>
      </FormField>

      <Button
        type="submit"
        disabled={!isChanged}
        className={!isChanged ? "bg-gray-dark/80" : ""}
      >
        {loading ? <Loader /> : initialValues ? "Edit Todo" : "Add Todo"}
      </Button>
    </form>
  );
};

export default TodoForm;
