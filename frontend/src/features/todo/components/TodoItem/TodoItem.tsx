import type { Todo } from "../../types/todo.type";
import TodoActions from "./TodoActions/TodoActions";
import TodoCheckBox from "./TodoCheckBox/TodoCheckBox";
import TodoContent from "./TodoContent/TodoContent";
type Props = {
  todo:Todo
}
const TodoItem = ({ todo }: Props) => {
  console.log(todo)
  
  return (
    <article className="grid grid-cols-[auto_1fr_auto] gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <TodoCheckBox />
      <TodoContent todo={todo} />
      <TodoActions todo={ todo} />
    </article>
  );
};

export default TodoItem;
