import { useState } from "react";
import FormField from "../../../../../components/form/FormField/FormField";
import Select from "../../../../../components/form/Select/Select";
import SelectItem from "../../../../../components/form/Select/SelectItem";
import {
  categoryFilters,
  priorityFilters,
  statusFilters,
} from "../../../constants/todo.constants";
import { MetaStyles } from "../../TodoItem/TodoContent/TodoMeta/todoMeta.styles";
import type {
  CategoryFilter,
  PriorityFilter,
  StatusFilter,
} from "../../../types/todo.type";

const TodoFilter = () => {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [priority, setPriority] = useState<PriorityFilter>("all");

  const [openSelect, setOpenSelect] = useState<
    "category" | "status" | "priority" | null
  >(null);

  return (
    <div className="grid grid-cols-[auto_auto] items-end gap-4 ">
      <span className="text-md font-medium text-text ">
        Filter by:
      </span>

      <div className="grid grid-cols-3 gap-3">
        <FormField title="Status" name="status">
          <Select
            value={status}
            isOpen={openSelect === "status"}
            onOpen={() => setOpenSelect("status")}
            onClose={() => setOpenSelect(null)}
            buttonClassName={(
              status !== "all" ? MetaStyles.status[status] : ""
            )+" min-w-30"}
          >
            {statusFilters.map((item) => (
              <SelectItem
                key={item}
                className={
                  item !== "all" ? MetaStyles.status[item] : ""
                }
                onClick={() => {
                  setStatus(item);
                  setOpenSelect(null);
                }}
              >
                {item}
              </SelectItem>
            ))}
          </Select>
        </FormField>

        <FormField title="Priority" name="priority">
          <Select
            value={priority}
            isOpen={openSelect === "priority"}
            onOpen={() => setOpenSelect("priority")}
            onClose={() => setOpenSelect(null)}
            buttonClassName={
             ( priority !== "all"
                ? MetaStyles.priority[priority]
                : "")+ " min-w-30"
            }
          >
            {priorityFilters.map((item) => (
              <SelectItem
                key={item}
                className={
                  item !== "all"
                    ? MetaStyles.priority[item]
                    : ""
                }
                onClick={() => {
                  setPriority(item);
                  setOpenSelect(null);
                }}
              >
                {item}
              </SelectItem>
            ))}
          </Select>
        </FormField>

        <FormField title="Category" name="category">
          <Select
            value={category}
            isOpen={openSelect === "category"}
            onOpen={() => setOpenSelect("category")}
            onClose={() => setOpenSelect(null)}
            buttonClassName={
              (category !== "all"
                ? MetaStyles.category[category]
                : "")+ " min-w-30"
            }
          >
            {categoryFilters.map((item) => (
              <SelectItem
                key={item}
                className={
                  item !== "all"
                    ? MetaStyles.category[item]
                    : ""
                }
                onClick={() => {
                  setCategory(item);
                  setOpenSelect(null);
                }}
              >
                {item}
              </SelectItem>
            ))}
          </Select>
        </FormField>
      </div>
    </div>
  );
};

export default TodoFilter;