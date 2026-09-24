import { useState } from "react";
import { useTodo } from "../../../store/todo.store";
import TodoForm from "../../TodoForm/TodoForm";
import Modal from "../../../../../components/modals/Modal/Modal";
import type { Todo } from "../../../types/todo.type";
import Loader from "../../../../../components/Loader/Loader";
import EditIcon from "../../../../../components/Icons/Edit";
import DeleteIcon from "../../../../../components/Icons/Delete";
import ConfirmModal from "../../../../../components/modals/ConfirmModal/ConfirmModal";
import Button from "../../buttons/Button/Button";

type Props = {
  todo: Todo;
};

const TodoActions = ({ todo }: Props) => {
  const { deleteTodo, loadingIds } = useTodo();
  const [isEditOpen, setEditOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, dueDate, ...itemToEdit } = todo;

  const isDeleting = loadingIds.includes(todo.id);
  // const isDone = todo.status === "done";

  if (isDeleting) {
    return (
      <div className="grid min-h-10 place-items-center">
        <Loader size="sm" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 items-center gap-1 md:gap-2">
      <Button
        type="button"
        variant="ghost"
        onClick={(e) => {
          e.stopPropagation();
          setEditOpen(true);
        }}
      >
        <EditIcon className="inline-block md:hidden" />
        <span className="hidden md:inline-block">Edit</span>
      </Button>

      <Button
        type="button"
        variant="danger"
        onClick={(e) => {
          e.stopPropagation();
          setConfirmModalOpen(true);
        }}
      >
        <DeleteIcon className="inline-block md:hidden" />
        <span className="hidden md:inline-block">Delete</span>
      </Button>

      <Modal isOpen={isEditOpen} onClose={() => setEditOpen(false)}>
        <TodoForm
          closeModal={() => setEditOpen(false)}
          initialValues={itemToEdit}
        />
      </Modal>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Delete Todo"
        message={`Are you sure you want to delete "${todo.title}"?`}
        cancelText="Cancel"
        confirmText="Delete"
        isLoading={isDeleting}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => deleteTodo(todo.id)}
      />
    </div>
  );
};

export default TodoActions;
