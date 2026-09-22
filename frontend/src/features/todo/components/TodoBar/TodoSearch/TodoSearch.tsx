import { useSearchParams } from "react-router";
import Input from "../../../../../components/form/Input/Input";
import Search from "../../../../../components/Icons/Search";


const TodoSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 " />
        <Input
          placeholder="Search tasks..."
          className="pl-10 lg:min-w-xl"
          value={search}
          onChange={(e) =>
            setSearchParams((prev) => {
              if (e.target.value) {
                prev.set("search", e.target.value);
              } else {
                prev.delete("search");
              }

              return prev;
            })
          }
        />
      </div>
    </div>
  );
};

export default TodoSearch;
