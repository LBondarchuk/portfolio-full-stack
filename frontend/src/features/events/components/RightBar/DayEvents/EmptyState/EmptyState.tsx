import { motion } from "motion/react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import Button from "../../../../../../components/buttons/Button/Button";
import Modal from "../../../../../../components/modals/Modal/Modal";
import CreateEventForm from "../../../EventForm/EventForm";
import { useState } from "react";
const EmptyState = () => {
  const [isFormOpen, setFormOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full min-h-70 flex-col items-center justify-center px-5 text-center"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-gray-light">
        <FiCalendar className="size-5 text-text-muted" />
      </div>

      <h3 className="text-sm font-semibold text-text">Nothing planned</h3>

      <p className="mt-1 max-w-55 text-xs leading-5 text-text-secondary">
        This day is completely free. Add an event to start planning.
      </p>

      <Button onClick={() => setFormOpen(true)}>
        <div className="flex items-center content-center gap-1">
          <FiPlus className="size-3.5" />
          <span>Add event</span>
        </div>
      </Button>

      <Modal isOpen={isFormOpen} onClose={() => setFormOpen(false)}>
        <CreateEventForm onClose={() => setFormOpen(false)} />
      </Modal>
    </motion.div>
  );
};

export default EmptyState;
