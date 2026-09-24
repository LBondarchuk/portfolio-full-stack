import type { Todo } from "../../../types/todo.type";
import TodoMeta from "./TodoMeta/TodoMeta";

type Props = {
  todo: Todo;
};

const TodoContent = ({ todo }: Props) => {
  const { title, description, category, status, priority } = todo;

  const isDone = status === "done";

  return (
    <div className="grid gap-3">
      <div className="grid gap-1">
        <h3
          className={`font-medium transition-colors ${
            isDone ? "text-text-secondary line-through opacity-60" : "text-text"
          } truncate`}
        >
          {title}
        </h3>

        <p
          className={`text-sm transition-colors ${
            isDone ? "text-text-secondary opacity-50" : "text-text-secondary"
          } truncate`}
        >
          {description}
        </p>
      </div>

      <TodoMeta
        category={category}
        status={status}
        priority={priority}
        isDone={isDone}
      />
    </div>
  );
};

export default TodoContent;
