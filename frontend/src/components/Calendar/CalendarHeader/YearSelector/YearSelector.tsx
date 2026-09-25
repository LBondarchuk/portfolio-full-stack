import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import ArrowDownIcon from "../../../Icons/ArrowDown";
import Button from "../../../buttons/Button/Button";

type YearSelectorProps = {
  currentDate: Date;
  onChangeYear: (year: number) => void;
};

const YearSelector = ({ currentDate, onChangeYear }: YearSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const currentYear = currentDate.getFullYear();

  const [startYear, setStartYear] = useState(Math.floor(currentYear / 10) * 10);

  const years = Array.from({ length: 10 }, (_, index) => {
    return startYear + index;
  });

  const changeYearRange = (amount: number) => {
    setStartYear((prev) => prev + amount * 10);
  };

  const selectYear = (year: number) => {
    onChangeYear(year);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="
          relative
          cursor-pointer
          rounded-xl
          border border-gray-200
          bg-gray-50
          px-4 py-2
          text-lg font-semibold
          text-gray-800
          shadow-sm
          transition-colors
          hover:border-orange-200
          hover:bg-orange-50
          hover:text-orange-600
        "
      >
        {currentYear}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="
                fixed
                inset-0
              "
            />

            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="
                absolute
                left-1/2
                mt-2
                w-64
                -translate-x-1/2
                rounded-2xl
                border border-gray-200/70
                bg-white/95
                p-3
                shadow-xl
                shadow-gray-900/10
                backdrop-blur-md
              "
            >
              <div className="mb-3 flex items-center justify-between">
                <Button variant="ghost"  onClick={() => changeYearRange(-1)}>
                  <ArrowDownIcon className="h-4 w-4 rotate-90" />
                </Button>
                <span className="font-semibold text-gray-800">
                  {startYear} – {startYear + 9}
                </span>

              <Button variant="ghost"  onClick={() => changeYearRange(1)}>
                  <ArrowDownIcon className="h-4 w-4 -rotate-90" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {years.map((year) => {
                  const isCurrentYear = year === currentYear;

                  return (
                    <motion.button
                      key={year}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => selectYear(year)}
                      className={`
                        rounded-xl
                        px-3 py-2
                        text-sm font-medium
                        transition-colors
                        ${
                          isCurrentYear
                            ? `
                              bg-orange-500
                              text-white
                              shadow-sm
                              shadow-orange-500/20
                            `
                            : `
                              bg-gray-50
                              text-gray-700
                              hover:bg-orange-50
                              hover:text-orange-600
                            `
                        }
                      `}
                    >
                      {year}
                    </motion.button>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                className="w-full  mt-3"
                onClick={() => setIsOpen(false)}
    
              >
                Close
              </Button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YearSelector;
