
import { useTodo } from "../../store/todo.store";
import TodoItem from "../TodoItem/TodoItem";
import TodoItemSkeleton from "../TodoItem/TodoItemSkeleton/TodoItemSkeleton";

const TodoList = () => {
  const { todos, loading,loadingIds } = useTodo();


  if (todos.length === 0 && !loading) {
    return (
      <div className="grid  h-full place-items-center py-4 ">
        <div className="grid place-items-center ">
          <h2 className="text-lg font-semibold text-text">Noch keine Aufgaben</h2>

          <p className="mt-1 text-sm text-text-secondary">
            Erstelle deine erste Aufgabe, um loszulegen.
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid h-full grid-rows-[1fr_auto] ">
      <div className="grid content-start gap-y-3 overflow-y-auto py-4">
        {loadingIds.includes('create') && <TodoItemSkeleton/>}
        {loading&& !loadingIds.length
          ? Array.from({ length: 5 }).map((_, index) => (
              <TodoItemSkeleton key={index} />
            ))
          : todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
      </div>
    </div>
  );
};

export default TodoList;
