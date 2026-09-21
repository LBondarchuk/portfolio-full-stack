import type {  Todo } from "../../../types/todo.type";
import TodoMeta from "./TodoMeta/TodoMeta";
type Props = {todo:Todo}
const TodoContent = ({ todo }: Props) => {
 const{ title, description, category, status, priority} =todo
  return (
    <div className="grid gap-3">
      {/* Header */}
      <div className="grid gap-1">
        <h3 className="font-medium text-text">{ title}</h3>

        <p className="text-sm text-text-secondary">
          {description}
        </p>
      </div>

      <TodoMeta category={category} status={status} priority={priority} />
    </div>
  );
};

export default TodoContent;
