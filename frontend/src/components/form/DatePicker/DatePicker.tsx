import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CalendarIcon from "../../Icons/Calendar";
import Calendar from "../../Calendar/Calendar";

type DatePickerProps = {
  value: Date;
  onChange: (date: Date) => void;
};

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = value.toLocaleDateString("de-DE", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex
          w-full
          items-center
          justify-between
          rounded-md
          border
          border-border
          bg-surface
          px-3
          py-2.5
          text-sm
          text-text
          transition-colors
          hover:border-primary
          cursor-pointer
        "
      >
        <span>{formattedDate}</span>

        <CalendarIcon className="size-4 " />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -4, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="
                absolute
                left-0
                top-full
                z-20
              "
            >
              <Calendar variant="picker" value={value} onChange={onChange} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DatePicker;
