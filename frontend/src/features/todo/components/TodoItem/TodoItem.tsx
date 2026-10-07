import { useState } from "react";
import { toast } from "react-toastify";

import { useTodo } from "../../store/todo.store";
import type { Todo } from "../../types/todo.type";

import TodoActions from "./TodoActions/TodoActions";
import TodoCheckBox from "./TodoCheckBox/TodoCheckBox";
import TodoContent from "./TodoContent/TodoContent";
import TodoModal from "./TodoModal/TodoModal";
import TodoItemSkeleton from "./TodoItemSkeleton/TodoItemSkeleton";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const { editTodo, loadingIds } = useTodo();

  const [isTodoModalOpen, setTodoModalOpen] = useState(false);

  const setDone = async () => {
    try {
      await editTodo({
        id: todo.id,
        status: todo.status === "done" ? "in-progress" : "done",
      });
    } catch {
      toast.error("Aufgabe konnte nicht aktualisiert werden.");
    }
  };

  if (loadingIds.includes(todo.id)) {
    return <TodoItemSkeleton />;
  }

  const isDone = todo.status === "done";

  return (
    <>
      <article
        onClick={() => setTodoModalOpen(true)}
        className={`
          group
          relative
          grid
          grid-cols-[auto_1fr_auto]
          items-center
          gap-3
          rounded-2xl
          border
          bg-surface
          p-4
          transition-all
          duration-200
          ease-out
          cursor-pointer

          ${isDone ? "border-border/70 opacity-80" : "border-border"}

          hover:-translate-y-0.5
          hover:border-border-strong
          hover:shadow-md

          active:translate-y-0
          active:shadow-sm
        `}
      >
        <TodoCheckBox checked={isDone} onChange={setDone} />

        <TodoContent todo={todo} />

        <TodoActions todo={todo} />

        <div
          className="
            pointer-events-none
            absolute
            inset-y-3
            left-0
            w-1
            rounded-lg
            bg-primary
            opacity-0
            transition-opacity
            duration-200
            group-hover:opacity-100
          "
        />
      </article>

      <TodoModal
        todo={todo}
        isOpen={isTodoModalOpen}
        onClose={() => setTodoModalOpen(false)}
      />
    </>
  );
};

export default TodoItem;
