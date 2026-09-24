import { useState } from "react";
import { useTodo } from "../../store/todo.store";
import type { Todo } from "../../types/todo.type";
import TodoActions from "./TodoActions/TodoActions";
import TodoCheckBox from "./TodoCheckBox/TodoCheckBox";
import TodoContent from "./TodoContent/TodoContent";
import TodoModal from "./TodoModal/TodoModal";
type Props = {
  todo: Todo;
};
const TodoItem = ({ todo }: Props) => {
  const { editTodo } = useTodo();
  const [isTodoModalOpen, setTodoModalOpen] = useState(false);
  const setDone = () => {
    editTodo(
      { id: todo.id, status: todo.status === "done" ? "in-progress" : "done" },
      () => {},
    );
  };
  return (
    <article onClick={()=>{setTodoModalOpen(true)}} className="grid grid-cols-[auto_1fr_auto] gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm cursor-pointer">
      <TodoCheckBox checked={todo.status === "done"} onChange={setDone} />
      <TodoContent todo={todo} />
      <TodoActions todo={todo} />
      <TodoModal
        todo={todo}
        isOpen={ isTodoModalOpen}
        onClose={() => {
          setTodoModalOpen(false);
        }}
      />
    </article>
  );
};

export default TodoItem;
