import Input from "../../../../../components/form/Input/Input";
import Search from "../../../../../components/Icons/Search";

const TodoSearch = () => {
  return (
    <div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 " />
        <Input placeholder="Search tasks..." className="pl-10 lg:min-w-xl" />
      </div>
    </div>
  );
};

export default TodoSearch;
