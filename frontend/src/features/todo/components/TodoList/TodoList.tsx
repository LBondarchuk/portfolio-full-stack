import Loader from "../../../../components/Loader/Loader";
import { useTodo } from "../../store/todo.store";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = () => {
  const { todos, loading } = useTodo();

  if (loading) return <Loader size="lg" />;

  console.log(todos,'td')

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
    </div>
  );
};

export default TodoList;
