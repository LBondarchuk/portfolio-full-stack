import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import CloseIcon from "../../Icons/Close";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 px-3 py-3"
      onClick={(event) => {
        event.stopPropagation();
        onClose();
      }}
    >
      <div
        className="relative max-h-[calc(100dvh-1.5rem)] w-full max-w-lg overflow-y-auto overscroll-contain rounded-xl bg-surface p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <CloseIcon onClick={onClose} className="absolute top-2 right-2" />
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
