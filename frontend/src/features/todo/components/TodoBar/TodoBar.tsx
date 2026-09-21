import TodoFilter from "./TodoFilter/TodoFilter";
import TodoSearch from "./TodoSearch/TodoSearch";
import TodoSort from "./TodoSort/TodoSort";

const TodoBar = () => {
  return (
    <div className="grid grid-cols-[1fr_auto_auto] items-end">
      <TodoSearch />
      <div className="grid grid-cols-[auto_auto] gap-10 ">
        <TodoFilter />
        <TodoSort />
      </div>
    </div>
  );
};

export default TodoBar;
