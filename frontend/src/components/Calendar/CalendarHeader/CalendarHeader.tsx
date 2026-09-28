import { motion } from "motion/react";
import YearSelector from "./YearSelector/YearSelector";
import Button from "../../buttons/Button/Button";
import ArrowDownIcon from "../../Icons/ArrowDown";
import type { CalendarVariant } from "../Calendar";

type CalendarHeaderProps = {
  variant?: CalendarVariant;
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onChangeYear: (year: number) => void;
};

const CalendarHeader = ({
  variant = "default",
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onChangeYear,
}: CalendarHeaderProps) => {
  const isPicker = variant === "picker";

  return (
    <header
      className={`
        relative z-15
        flex flex-col
        gap-2
        rounded-2xl
        border border-gray-200/70
        bg-white/80
        p-2
        shadow-sm

        ${
          !isPicker &&
          `
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:gap-3
            sm:p-3
          `
        }
      `}
    >
      <div
        className={`
          flex
          w-full
          items-center
          justify-between
          gap-2

          ${
            !isPicker &&
            `
              sm:w-auto
              sm:justify-start
            `
          }
        `}
      >
        <Button
          variant="ghost"
          onClick={onPreviousMonth}
          className="
            shrink-0
            px-2
            py-1.5
            sm:px-3
            sm:py-2
          "
        >
          <ArrowDownIcon className="h-4 w-4 rotate-90" />
        </Button>

        <motion.h2
          key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`
            min-w-0
            flex-1
            truncate
            text-center
            text-base
            font-semibold
            capitalize
            tracking-tight
            text-gray-800

            ${
              !isPicker &&
              `
                sm:flex-none
                sm:text-left
                sm:text-xl
              `
            }
          `}
        >
          {currentDate.toLocaleString("en-US", {
            month: "long",
          })}
        </motion.h2>

        <Button
          variant="ghost"
          onClick={onNextMonth}
          className="
            shrink-0
            px-2
            py-1.5
            sm:px-3
            sm:py-2
          "
        >
          <ArrowDownIcon className="h-4 w-4 -rotate-90" />
        </Button>
      </div>

      <div
        className={`
          flex
          w-full
          items-center
          justify-between
          gap-2

          ${
            !isPicker &&
            `
              sm:w-auto
              sm:justify-end
              sm:gap-3
            `
          }
        `}
      >
        <div className="relative">
          <YearSelector
            currentDate={currentDate}
            onChangeYear={onChangeYear}
            variant={variant}
            
            
          />
        </div>

        <Button
          onClick={onToday}
          className="
            shrink-0
            px-3
            py-2
            text-sm
            sm:px-4
          "
        >
          Today
        </Button>
      </div>
    </header>
  );
};

export default CalendarHeader;