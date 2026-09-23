import { useTodo } from "../../store/todo.store";
import type { Todo } from "../../types/todo.type";
import TodoActions from "./TodoActions/TodoActions";
import TodoCheckBox from "./TodoCheckBox/TodoCheckBox";
import TodoContent from "./TodoContent/TodoContent";
type Props = {
  todo:Todo
}
const TodoItem = ({ todo }: Props) => { 
  const {editTodo, loadingIds} = useTodo()
  const setDone = () => { editTodo({ id: todo.id, status: todo.status === 'done' ? "in-progress" : "done" }, () => { }) }
  return (
    <article className="grid grid-cols-[auto_1fr_auto] gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm">
      <TodoCheckBox checked={todo.status === "done" } onChange={setDone} />
      <TodoContent todo={todo} />
      <TodoActions todo={ todo} /> 
    </article>
  );
};

export default TodoItem;
