import type { ReactNode } from "react";
import CloseIcon from "../Icons/Close";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 grid place-items-center bg-black/50 z-10"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-xl bg-surface p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseIcon onClick={onClose} className="absolute top-2 right-2" />
        {children}
      </div>
    </div>
  );
};

export default Modal;
