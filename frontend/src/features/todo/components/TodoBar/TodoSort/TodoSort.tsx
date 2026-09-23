import { useState } from "react";
import Select from "../../../../../components/form/Select/Select";
import SelectItem from "../../../../../components/form/Select/SelectItem";
import { useSearchParams } from "react-router";
import SortIcon from "../../../../../components/Icons/Sort";

export type SortOption = "newest" | "oldest";

const sortOptions: SortOption[] = ["newest", "oldest"];

const TodoSort = () => {
  const [isSortPanelOpen, setSortPanelOpen] = useState(false);
  const [isSortOpen, setSortOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const sort = (searchParams.get("sort") as SortOption) || "newest";

  const handleSortChange = (item: SortOption) => {
    setSearchParams((prev) => {
      if (item === "newest") {
        prev.delete("sort");
      } else {
        prev.set("sort", item);
      }

      return prev;
    });

    setSortOpen(false);
    setSortPanelOpen(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setSortPanelOpen((prev) => !prev)}
        className="flex w-fit items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2 md:hidden"
        aria-expanded={isSortPanelOpen}
      >
        <SortIcon />
        <span>Sort</span>
      </button>

      <div className={isSortPanelOpen ? "block" : "hidden md:block"}>
        <div className="grid grid-cols-[auto_auto] items-end gap-4">
          <SortIcon className="-translate-y-2 hidden md:block" />

          <Select
            value={sort === "newest" ? "Newest" : "Oldest"}
            isOpen={isSortOpen}
            onOpen={() => setSortOpen(true)}
            onClose={() => setSortOpen(false)}
            buttonClassName="min-w-30"
          >
            {sortOptions.map((item) => (
              <SelectItem
                key={item}
                onClick={() => handleSortChange(item)}
              >
                {item}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TodoSort;