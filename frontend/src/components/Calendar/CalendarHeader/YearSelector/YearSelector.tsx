import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ArrowDownIcon from "../../../Icons/ArrowDown";
import Button from "../../../buttons/Button/Button";
import type { CalendarVariant } from "../../Calendar";

type YearSelectorProps = {
  currentDate: Date;
  onChangeYear: (year: number) => void;
  variant?: CalendarVariant;
};

const YearSelector = ({ currentDate, onChangeYear }: YearSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = currentDate.getFullYear();

  const [startYear, setStartYear] = useState(Math.floor(currentYear / 10) * 10);

  const years = Array.from({ length: 10 }, (_, index) => startYear + index);

  const changeYearRange = (amount: number) => {
    setStartYear((prev) => prev + amount * 10);
  };

  const selectYear = (year: number) => {
    onChangeYear(year);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          flex
          h-9
          items-center
          gap-1.5
          rounded-lg
          border
          border-border
          bg-surface
          px-3
          text-sm
          font-medium
          text-text
          transition-colors
          hover:border-primary/30
          hover:bg-gray-light
        "
      >
        <span className="cursor-pointer">{currentYear}</span>

        <ArrowDownIcon
          className={`
            size-3.5
            text-text-secondary
            transition-transform
            duration-200
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -6,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -6,
                scale: 0.97,
              }}
              transition={{
                duration: 0.15,
                ease: "easeOut",
              }}
              className="
                absolute
                right-0
                top-full
                z-30
                mt-2
                w-64
                rounded-xl
                border
                border-border
                bg-surface
                p-3
                shadow-lg
              "
            >
            
              <div className="mb-3 flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={() => changeYearRange(-1)}
                  className=" px-2!"
                >
                  <ArrowDownIcon className="size-3.5 rotate-90" />
                </Button>

                <span className="text-sm font-semibold text-text">
                  {startYear} – {startYear + 9}
                </span>

                <Button
                  variant="ghost"
                  onClick={() => changeYearRange(1)}
                  className=" px-2!"
                >
                  <ArrowDownIcon className="size-3.5 -rotate-90" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {years.map((year) => {
                  const isCurrentYear = year === currentYear;

                  return (
                    <motion.button
                      key={year}
                      type="button"
                      whileTap={{ scale: 0.96 }}
                      onClick={() => selectYear(year)}
                      className={`
                        rounded-lg
                        px-3
                        py-2
                        text-sm
                        font-medium
                        transition-colors

                        ${
                          isCurrentYear
                            ? "bg-primary text-white"
                            : "text-text hover:bg-gray-light"
                        }
                      `}
                    >
                      {year}
                    </motion.button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  mt-3
                  w-full
                  rounded-lg
                  py-2
                  text-xs
                  font-medium
                  text-text-secondary
                  transition-colors
                  hover:bg-gray-light
                  hover:text-text
                  cursor-pointer
                "
              >
                Schließen
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YearSelector;
