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
import { categories, priorities, statuses } from "../../constants/todo.constants";

type FormFilelds = Pick<CreateTodo, "title" | "description">;
type SelectName = "category" | "status" | "priority" ;

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
  const [openSelect, setOpenSelect] = useState<SelectName| null>(null);
  const { createTodo, editTodo } = useTodo((state) => state);
  const [form, setForm] = useState(
    initialValues
      ? { title: initialValues.title, description: initialValues.description }
      : defaultInputs,
  );
  const [formSelects, setFormSelects] = useState<Selects>(defaultSelects);

  const handleSubmitForm = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (initialValues) {
      editTodo({ id: initialValues.id, ...form, ...formSelects });
    } else {
      createTodo({ ...form, ...formSelects });
    }

    setForm(defaultInputs);
    setFormSelects(defaultSelects);
    closeModal();
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmitForm}>
      <FormField name="title" title="Titel">
        <Input
          id="title"
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
          value={form.description}
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

      <Button>Add Todo</Button>
    </form>
  );
};

export default TodoForm;
