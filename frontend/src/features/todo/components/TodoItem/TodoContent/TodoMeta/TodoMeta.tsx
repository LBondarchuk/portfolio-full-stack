import type { Category, Priority, Status } from "../../../../types/todo.type";
import { MetaStyles } from "./todoMeta.styles";

type Props = {
  category: Category;
  status: Status;
  priority: Priority;
  isDone: boolean;
};

const TodoMeta = ({ category, status, priority, isDone }: Props) => {
  const doneClass = isDone
    ? "bg-gray-light text-text-secondary border border-border"
    : "";

  return (
    <div className="flex items-center gap-2">
      <span
        className={` w-3 h-3 sm:w-fit sm:h-fit 
          rounded-md sm:px-2 sm:py-1 text-xs
          ${isDone ? doneClass : MetaStyles.category[category]}
        `}
      >
        <span className="hidden sm:inline-block">{category}</span>
      </span>

      <span
        className={`w-3 h-3 sm:w-fit sm:h-fit 
          rounded-md sm:px-2 sm:py-1 text-xs
          ${isDone ? doneClass : MetaStyles.status[status]}
        `}
      >
        <span className="hidden sm:inline-block">{status}</span>
      </span>

      <span
        className={`w-3 h-3 sm:w-fit sm:h-fit
          rounded-md sm:px-2 sm:py-1 text-xs
          ${isDone ? doneClass : MetaStyles.priority[priority]}
        `}
      >
        <span className="hidden sm:inline-block ">{priority}</span>
      </span>
    </div>
  );
};

export default TodoMeta;
