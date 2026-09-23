import { useState } from "react";
import { useTodo } from "../../../store/todo.store";
import TodoForm from "../../TodoForm/TodoForm";
import Modal from "../../../../../components/Modal/Modal";
import type { Todo } from "../../../types/todo.type";
import Loader from "../../../../../components/Loader/Loader";

type Props = {
  todo: Todo;
};

const TodoActions = ({ todo }: Props) => {
  const { deleteTodo, loadingIds } = useTodo();
  const [isEditOpen, setEditOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, dueDate, ...itemToEdit } = todo;

  const isDeleting = loadingIds.includes(todo.id);
  const isDone = todo.status === "done";

  if (isDeleting) {
    return (
      <div className="grid min-h-10 place-items-center">
        <Loader size="sm" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 items-center gap-2">
      <button
        type="button"
        onClick={() => setEditOpen(true)}
        className={`h-fit rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
          isDone
            ? "text-text-secondary/60 hover:bg-gray-light hover:text-text-secondary"
            : "text-text-secondary hover:bg-gray-light hover:text-text"
        }`}
      >
        Edit
      </button>

      <button
        type="button"
        onClick={() => deleteTodo(todo.id)}
        className={`h-fit rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
          isDone
            ? "text-danger/60 hover:bg-red-50 hover:text-danger"
            : "text-danger hover:bg-red-50"
        }`}
      >
        Delete
      </button>

      <Modal
        isOpen={isEditOpen}
        onClose={() => setEditOpen(false)}
      >
        <TodoForm
          closeModal={() => setEditOpen(false)}
          initialValues={itemToEdit}
        />
      </Modal>
    </div>
  );
};

export default TodoActions;