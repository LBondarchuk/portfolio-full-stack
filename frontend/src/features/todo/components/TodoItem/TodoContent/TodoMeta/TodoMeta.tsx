import type { Category, Priority, Status } from "../../../../types/todo.type";
import { MetaStyles } from "./todoMeta.styles";


type Props = {
  category: Category;
  status: Status;
  priority: Priority;
};





const TodoMeta = ({ category, status, priority }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`rounded-md px-2 py-1 text-xs ${MetaStyles.category[category]}`}
      >
        {category}
      </span>

      <span
        className={`rounded-md px-2 py-1 text-xs ${MetaStyles.status[status]}`}
      >
        {status}
      </span>

      <span
        className={`rounded-md px-2 py-1 text-xs ${MetaStyles.priority[priority]}`}
      >
        {priority}
      </span>
    </div>
  );
};

export default TodoMeta;
