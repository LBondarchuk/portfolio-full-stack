import Button from "../../buttons/Button/Button";
import Loader from "../../Loader/Loader";
import Modal from "../Modal/Modal";

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  isOpen,
  title,
  message,
  cancelText = "Cancel",
  confirmText = "Confirm",
  isLoading = false,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <h2 className="text-xl font-semibold text-text">{title}</h2>

          <p className="text-sm leading-6 text-text-secondary">{message}</p>
        </div>

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <Button
            variant="outlined"
            type="button"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-danger text-white hover:bg-danger/90"
          >
            {isLoading ? <Loader /> : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
