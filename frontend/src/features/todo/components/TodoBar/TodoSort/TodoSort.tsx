import { useState } from "react";
import Select from "../../../../../components/form/Select/Select";
import SelectItem from "../../../../../components/form/Select/SelectItem";
import { useSearchParams } from "react-router";
export type SortOption =
  | "newest"
  | "oldest"

const sortOptions: SortOption[] = [
  "newest",
  "oldest",
];

const TodoSort = () => {
  const [isSortOpen, setSortOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="grid grid-cols-[auto_auto] h-auto gap-4 items-end justify-end">
      <span className="text-md font-medium text-text ">Sort :</span>
      <Select
        value={searchParams.get("sort")|| "Newest"}
        isOpen={isSortOpen}
        onOpen={() => setSortOpen(true)}
        onClose={() => setSortOpen(false)}
        buttonClassName="min-w-30"
      >
        {sortOptions.map((item) => (
          <SelectItem
            key={item}
            onClick={() => {
              setSearchParams(prev => {
                if (item !== "newest") {
                  prev.set( "sort", item );
                } else {
                  prev.delete("sort"); 
                }
                      return prev
              });
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
