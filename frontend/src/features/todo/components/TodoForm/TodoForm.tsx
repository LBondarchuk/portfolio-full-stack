import { useForm } from "react-hook-form";
import type { CreateTodo, EditTodo } from "../../types/todo.type";
import FormField from "../../../../components/form/FormField/FormField";
import Select from "../../../../components/form/Select/Select";
import Button from "../../../../components/buttons/Button/Button";
import Input from "../../../../components/form/Input/Input";
import SelectItem from "../../../../components/form/Select/SelectItem";
import Loader from "../../../../components/Loader/Loader";
import { useTodo } from "../../store/todo.store";
import { MetaStyles } from "../TodoItem/TodoContent/TodoMeta/todoMeta.styles";

import {
  categories,
  priorities,
  statuses,
} from "../../constants/todo.constants";

import { useTodoForm } from "./useTodoForm";
import Textarea from "../../../../components/form/Textarea/Textarea";
import { getTodoLabel } from "../../utils/todoLabels";

type Props = {
  closeModal: () => void;
  initialValues?: EditTodo;
};

export type TodoInputs = Pick<CreateTodo, "title" | "description">;

const TodoForm = ({ closeModal, initialValues }: Props) => {
  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors, isDirty },
  } = useForm<TodoInputs>({
    defaultValues: {
      title: initialValues?.title ?? "",
      description: initialValues?.description ?? "",
    },
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const {
    openSelect,
    setOpenSelect,
    isChanged,
    formSelects,
    setFormSelects,
    handleSubmitForm,
  } = useTodoForm(closeModal, initialValues, isDirty);

  const { loading } = useTodo();

  return (
    <form className="grid gap-4" onSubmit={hookFormSubmit(handleSubmitForm)}>
      <FormField name="title" title="Titel">
        <Input
          {...register("title", {
            validate: (value) => {
              const trimmedValue = value?.trim() ?? "";

              if (!trimmedValue) {
                return "Der Titel darf nicht nur aus Leerzeichen bestehen.";
              }

              if (trimmedValue.length < 3) {
                return "Der Titel muss mindestens 3 Zeichen enthalten.";
              }

              if (trimmedValue.length > 50) {
                return "Der Titel darf höchstens 50 Zeichen enthalten.";
              }

              return true;
            },
          })}
          error={errors.title?.message}
          className="w-full"
          id="title"
          type="text"
          placeholder="Aufgabentitel eingeben"
        />
      </FormField>

      <FormField name="description" title="Beschreibung">
        <Textarea
          {...register("description", {
            maxLength: {
              value: 900,
              message: "Die Beschreibung darf höchstens 900 Zeichen enthalten.",
            },
          })}
          id="description"
          rows={6}
          placeholder="Aufgabenbeschreibung eingeben"
          aria-invalid={Boolean(errors.description)}
          error={errors.description?.message}
        />
      </FormField>
      <FormField name="category" title="Kategorie">
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
              {getTodoLabel(category)}
            </SelectItem>
          ))}
        </Select>
      </FormField>
      <FormField name="status" title="Status">
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
              {getTodoLabel(status)}
            </SelectItem>
          ))}
        </Select>
      </FormField>

      <FormField name="priority" title="Priorität">
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
              {getTodoLabel(priority)}
            </SelectItem>
          ))}
        </Select>
      </FormField>

      <Button
        type="submit"
        disabled={!isChanged}
        className={!isChanged ? "bg-gray-dark/80" : ""}
      >
        {loading ? <Loader /> : initialValues ? "Aufgabe bearbeiten" : "Aufgabe hinzufügen"}
      </Button>
    </form>
  );
};

export default TodoForm;
