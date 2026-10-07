import { useState } from "react";
import { useTodo } from "../../../store/todo.store";
import TodoForm from "../../TodoForm/TodoForm";
import Modal from "../../../../../components/modals/Modal/Modal";
import type { Todo } from "../../../types/todo.type";
import Loader from "../../../../../components/Loader/Loader";
import EditIcon from "../../../../../components/Icons/Edit";
import DeleteIcon from "../../../../../components/Icons/Delete";
import ConfirmModal from "../../../../../components/modals/ConfirmModal/ConfirmModal";
import Button from "../../../../../components/buttons/Button/Button";
import { toast } from "react-toastify";

type Props = {
  todo: Todo;
};

const TodoActions = ({ todo }: Props) => {
  const { deleteTodo, loadingIds } = useTodo();
  const [isEditOpen, setEditOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { createdAt, dueDate, ...itemToEdit } = todo;

  const handleDelete = async () => {
  try {
    await deleteTodo(todo.id);

    setConfirmModalOpen(false);
    toast.success("Aufgabe wurde gelöscht.");
  } catch {
    toast.error("Aufgabe konnte nicht gelöscht werden.");
  }
};

  const isDeleting = loadingIds.includes(todo.id);
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
        <span className="hidden md:inline-block">Bearbeiten</span>
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
        <span className="hidden md:inline-block">Löschen</span>
      </Button>

      <Modal isOpen={isEditOpen} onClose={() => setEditOpen(false)}>
        <TodoForm
          closeModal={() => setEditOpen(false)}
          initialValues={itemToEdit}
        />
      </Modal>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title="Aufgabe löschen"
        message={`Möchtest du „${todo.title}“ wirklich löschen?`}
        cancelText="Abbrechen"
        confirmText="Löschen"
        isLoading={isDeleting}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default TodoActions;
