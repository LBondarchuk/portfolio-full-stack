import { useState } from "react";
import { useSearchParams } from "react-router";

import FormField from "../../../../../components/form/FormField/FormField";
import Select from "../../../../../components/form/Select/Select";
import SelectItem from "../../../../../components/form/Select/SelectItem";

import {
  categoryFilters,
  priorityFilters,
  statusFilters,
} from "../../../constants/todo.constants";

import type {
  CategoryFilter,
  PriorityFilter,
  StatusFilter,
} from "../../../types/todo.type";

import { MetaStyles } from "../../TodoItem/TodoContent/TodoMeta/todoMeta.styles";

const getFilterValue = <T extends string>(
  params: URLSearchParams,
  key: string,
  values: readonly T[]
): T => {
  const value = params.get(key);

  if (value && values.includes(value as T)) {
    return value as T;
  }

  return values[0];
};

const TodoFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [openSelect, setOpenSelect] = useState<
    "category" | "status" | "priority" | null
  >(null);

  const category: CategoryFilter = getFilterValue(
    searchParams,
    "category",
    categoryFilters
  );

  const status: StatusFilter = getFilterValue(
    searchParams,
    "status",
    statusFilters
  );

  const priority: PriorityFilter = getFilterValue(
    searchParams,
    "priority",
    priorityFilters
  );

  return (
    <div className="grid grid-cols-[auto_auto] items-end gap-4">
      <span className="text-md font-medium text-text">
        Filter by:
      </span>

      <div className="grid grid-cols-3 gap-3">
        <FormField title="Category" name="category">
          <Select
            value={category === "all" ? "All" : category}
            isOpen={openSelect === "category"}
            onOpen={() => setOpenSelect("category")}
            onClose={() => setOpenSelect(null)}
            buttonClassName={
              category !== "all"
                ? `${MetaStyles.category[category]} min-w-30`
                : "min-w-30"
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
                  setSearchParams((prev) => {
                    if (item === "all") {
                      prev.delete("category");
                    } else {
                      prev.set("category", item);
                    }

                    return prev;
                  });

                  setOpenSelect(null);
                }}
              >
                {item}
              </SelectItem>
            ))}
          </Select>
        </FormField>

        <FormField title="Status" name="status">
          <Select
            value={status === "all" ? "All" : status}
            isOpen={openSelect === "status"}
            onOpen={() => setOpenSelect("status")}
            onClose={() => setOpenSelect(null)}
            buttonClassName={
              status !== "all"
                ? `${MetaStyles.status[status]} min-w-30`
                : "min-w-30"
            }
          >
            {statusFilters.map((item) => (
              <SelectItem
                key={item}
                className={
                  item !== "all"
                    ? MetaStyles.status[item]
                    : ""
                }
                onClick={() => {
                  setSearchParams((prev) => {
                    if (item === "all") {
                      prev.delete("status");
                    } else {
                      prev.set("status", item);
                    }

                    return prev;
                  });

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
            value={priority === "all" ? "All" : priority}
            isOpen={openSelect === "priority"}
            onOpen={() => setOpenSelect("priority")}
            onClose={() => setOpenSelect(null)}
            buttonClassName={
              priority !== "all"
                ? `${MetaStyles.priority[priority]} min-w-30`
                : "min-w-30"
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
                  setSearchParams((prev) => {
                    if (item === "all") {
                      prev.delete("priority");
                    } else {
                      prev.set("priority", item);
                    }

                    return prev;
                  });

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