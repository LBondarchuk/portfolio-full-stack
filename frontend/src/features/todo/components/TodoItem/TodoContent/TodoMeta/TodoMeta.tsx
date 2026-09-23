import type {
  Category,
  Priority,
  Status,
} from "../../../../types/todo.type";
import { MetaStyles } from "./todoMeta.styles";

type Props = {
  category: Category;
  status: Status;
  priority: Priority;
  isDone: boolean;
};

const TodoMeta = ({
  category,
  status,
  priority,
  isDone,
}: Props) => {
  const doneClass = isDone
    ? "bg-gray-light text-text-secondary border border-border"
    : "";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`
          rounded-md px-2 py-1 text-xs
          ${isDone ? doneClass : MetaStyles.category[category]}
        `}
      >
        {category}
      </span>

      <span
        className={`
          rounded-md px-2 py-1 text-xs
          ${isDone ? doneClass : MetaStyles.status[status]}
        `}
      >
        {status}
      </span>

      <span
        className={`
          rounded-md px-2 py-1 text-xs
          ${isDone ? doneClass : MetaStyles.priority[priority]}
        `}
      >
        {priority}
      </span>
    </div>
  );
};

export default TodoMeta;