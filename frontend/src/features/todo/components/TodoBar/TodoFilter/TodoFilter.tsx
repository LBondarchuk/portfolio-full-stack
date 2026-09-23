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
import FilterIcon from "../../../../../components/Icons/Filter";

const getFilterValue = <T extends string>(
  params: URLSearchParams,
  key: string,
  values: readonly T[],
): T => {
  const value = params.get(key);

  if (value && values.includes(value as T)) {
    return value as T;
  }

  return values[0];
};

const TodoFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFilterOpen, setFilterOpen] = useState(false);

  const [openSelect, setOpenSelect] = useState<
    "category" | "status" | "priority" | null
  >(null);

  const category: CategoryFilter = getFilterValue(
    searchParams,
    "category",
    categoryFilters,
  );

  const status: StatusFilter = getFilterValue(
    searchParams,
    "status",
    statusFilters,
  );

  const priority: PriorityFilter = getFilterValue(
    searchParams,
    "priority",
    priorityFilters,
  );

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setFilterOpen((prev) => !prev)}
        className="flex w-fit items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 md:hidden"
        aria-expanded={isFilterOpen}
      >
        <FilterIcon />
        <span>Filter</span>
      </button>

      <div
        className={`
          flex flex-wrap gap-3 items-end
          ${isFilterOpen ? "flex" : "hidden"}
          md:flex
        `}
      >
        <FilterIcon className="-translate-y-2 hidden md:block" />
        <FormField title="Category" name="category" className="w-full md:w-fit">
          <Select
            value={category === "all" ? "All" : category}
            isOpen={openSelect === "category"}
            onOpen={() => setOpenSelect("category")}
            onClose={() => setOpenSelect(null)}
            buttonClassName={
              category !== "all"
                ? `${MetaStyles.category[category]} min-w-30 w-full`
                : "min-w-30 w-full"
            }
          >
            {categoryFilters.map((item) => (
              <SelectItem
                key={item}
                className={item !== "all" ? MetaStyles.category[item] : ""}
                onClick={() => {
                  setSearchParams((prev) => {
                    if (item === "all") {
                      prev.delete("category");
                    } else {
                      prev.set("category", item);
                    }
                    prev.delete("page");
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

        <FormField title="Status" name="status" className="w-full md:w-fit">
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
                className={item !== "all" ? MetaStyles.status[item] : ""}
                onClick={() => {
                  setSearchParams((prev) => {
                    if (item === "all") {
                      prev.delete("status");
                    } else {
                      prev.set("status", item);
                    }
                    prev.delete("page");
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

        <FormField title="Priority" name="priority" className="w-full md:w-fit">
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
                className={item !== "all" ? MetaStyles.priority[item] : ""}
                onClick={() => {
                  setSearchParams((prev) => {
                    if (item === "all") {
                      prev.delete("priority");
                    } else {
                      prev.set("priority", item);
                    }
                    prev.delete("page");
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
