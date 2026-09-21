import Pagination from "../../../../components/Pagination/Pagination";
import { useTodo } from "../../store/todo.store";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const todos = useTodo((state) => state.todos);

  if (todos.length === 0) {
    return (
      <div className="grid  h-full place-items-center py-4 ">
        <div className="grid place-items-center ">
          <h2 className="text-lg font-semibold text-text">No tasks yet</h2>

          <p className="mt-1 text-sm text-text-secondary">
            Create your first task to get started.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid h-full grid-rows-[1fr_auto] ">
      <div className="grid content-start gap-y-3 overflow-y-auto py-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>

      <div className="grid ju"><Pagination/></div>
    </div>
  );
};

export default TodoList;
