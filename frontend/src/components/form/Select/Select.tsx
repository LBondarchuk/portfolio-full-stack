import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import ArrowDownIcon from "../../Icons/ArrowDown";

type SelectProps = {
  value: ReactNode;
  children: ReactNode;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  className?: string;
  buttonClassName?:string

};

const Select = ({
  value,
  children,
  isOpen,
  onOpen,
  onClose,
  className,
  buttonClassName
}: SelectProps) => {
  const toggleSelect = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <div className={`relative ${className ?? ""}`}>
      {isOpen && <div className="fixed inset-0" onClick={onClose} />}

      <button
        type="button"
        onClick={toggleSelect}
        className={`grid w-full cursor-pointer grid-cols-[1fr_auto] items-center rounded-md border border-border px-3 py-2 text-left text-sm transition-colors duration-200 ${
    buttonClassName ?? "bg-surface text-text"
  }`}
      >
        <span className="capitalize">{value}</span>

        <ArrowDownIcon
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute grid gap-2 py-2 z-10 mt-1 w-full origin-top rounded-md border border-border bg-surface p-1 shadow-md"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
