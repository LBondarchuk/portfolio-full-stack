import { useState } from "react";

import Button from "../../../../../../../components/buttons/Button/Button";
import DeleteIcon from "../../../../../../../components/Icons/Delete";
import EditIcon from "../../../../../../../components/Icons/Edit";
import ConfirmModal from "../../../../../../../components/modals/ConfirmModal/ConfirmModal";
import { useEvents } from "../../../../../store/events.store";
import { useSearchParams } from "react-router";
import Modal from "../../../../../../../components/modals/Modal/Modal";
import EventForm from "../../../../EventForm/EventForm";
import { toast } from "react-toastify";

const Actions = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  const { deleteEvent, loading, event } = useEvents();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();
  if (!event) return null;

  const { id, ...eventRest } = event;

  const handleDelete = async () => {
    try {
      await deleteEvent(id, () => setIsDeleteOpen(false));

      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("id");
        return next;
      });

      toast.success("Event deleted successfully");
    } catch {
      toast.error("Failed to delete event");
    }
  };

  if (!event) return null;
  return (
    <>
      <div className="border-t border-border p-4">
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => setFormOpen(true)}
            variant="ghost"
            className="rounded-md! border-[0.1px]"
          >
            <div className="flex w-full items-center justify-center gap-2">
              <EditIcon className="h-3.5! w-3.5!" />
              <span className="text-xs">Edit</span>
            </div>
          </Button>

          <Button
            variant="danger"
            className="rounded-md!"
            onClick={() => setIsDeleteOpen(true)}
          >
            <div className="flex w-full items-center justify-center gap-2">
              <DeleteIcon className="h-3.5! w-3.5!" />
              <span className="text-xs">Delete</span>
            </div>
          </Button>
        </div>
      </div>
      <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
        <EventForm
          onClose={() => setFormOpen(false)}
          defaultValue={eventRest}
        />
      </Modal>

      <ConfirmModal
        isOpen={isDeleteOpen}
        title="Delete event?"
        message="Are you sure you want to delete this event? This action cannot be undone."
        cancelText="Cancel"
        confirmText="Delete"
        isLoading={loading}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default Actions;
