import TodoFilter from "./TodoFilter/TodoFilter";
import TodoSearch from "./TodoSearch/TodoSearch";
import TodoSort from "./TodoSort/TodoSort";

const TodoBar = () => {
  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-end">
      <div className=" flex-1">
        <TodoSearch />
      </div>

      <div className="flex gap-4 flex-wrap items-end">
        <TodoFilter />
        <TodoSort />
      </div>
    </div>
  );
};

export default TodoBar;