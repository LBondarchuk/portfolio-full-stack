import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ClockIcon from "../../Icons/Clock";


type TimePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const TimePicker = ({
  value,
  onChange,
}: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const times = generateTimes();

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
        <span>{value || "Select time"}</span>

        <ClockIcon className="size-4 text-text-secondary" />
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
                mt-2
                max-h-60
                w-full
                overflow-y-auto
                rounded-xl
                border
                border-border
                bg-surface
                p-1
                shadow-lg
              "
            >
              {times.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => {
                    onChange(time);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full
                    rounded-lg
                    px-3
                    py-2
                    text-left
                    text-sm
                    transition-colors
                    cursor-pointer
                    ${
                      value === time
                        ? "bg-primary-light font-medium text-primary"
                        : "text-text hover:bg-gray-light"
                    }
                  `}
                >
                  {time}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const generateTimes = () => {
  const times: string[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      times.push(
        `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
      );
    }
  }

  return times;
};

export default TimePicker;