import { useState } from "react";
import Select from "../../../../../components/form/Select/Select";
import SelectItem from "../../../../../components/form/Select/SelectItem";
export type SortOption =
  | "newest"
  | "oldest"
  | "priority-high"
  | "priority-low"
  | "status"
  | "category";

const sortOptions: SortOption[] = [
  "newest",
  "oldest",
  "priority-high",
  "priority-low",
  "status",
  "category",
];

const TodoSort = () => {
  const [isSortOpen, setSortOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<SortOption>("newest");
  return (
    <div className="grid grid-cols-[auto_auto] h-auto gap-4 items-end justify-end">
      <span className="text-md font-medium text-text ">Sort :</span>
      <Select
        value={selectedValue}
        isOpen={isSortOpen}
        onOpen={() => setSortOpen(true)}
              onClose={() => setSortOpen(false)}
              buttonClassName="min-w-30"
      >
        {sortOptions.map((item) => (
          <SelectItem
            key={item}
            onClick={() => {
              setSelectedValue(item);
              setSortOpen(false);
            }}
          >
            {item}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default TodoSort;
