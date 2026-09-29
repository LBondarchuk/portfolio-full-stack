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

  const month = currentDate.toLocaleString("en-US", {
    month: "long",
  });

  const year = currentDate.getFullYear();

  return (
    <header
      className={`
        border-b border-border
        bg-surface
        ${isPicker ? "p-2" : "px-4 py-3"}
      `}
    >
      <div
        className={`
          flex items-center flex-wrap md:flex-nowrap justify-between 
          gap-3
        `}
      >
        <div className="flex min-w-0 items-center gap-1 m-auto md:m-0 ">
          <Button
            variant="ghost"
            onClick={onPreviousMonth}
            aria-label="Previous month"
          >
            <ArrowDownIcon className="size-4 rotate-90" />
          </Button>

          <motion.div
            key={`${year}-${currentDate.getMonth()}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="min-w-0 px-2"
          >
            <h2 className="truncate text-sm font-semibold text-text sm:text-base">
              {month}
            </h2>

            {!isPicker && (
              <p className="text-xs text-text-muted">
                {year}
              </p>
            )}
          </motion.div>

          <Button
            variant="ghost"
            onClick={onNextMonth}
            aria-label="Next month"
          >
            <ArrowDownIcon className="size-4 -rotate-90" />
          </Button>
        </div>

  
        {!isPicker && (
          <div className="flex shrink-0 items-center justify-between gap-2 w-full md:w-fit">
            <YearSelector
              currentDate={currentDate}
              onChangeYear={onChangeYear}
              variant={variant}
            />

            <Button
              onClick={onToday}
              className="h-9 px-3 text-xs sm:px-4 sm:text-sm rounded-md!"
            >
              Today
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default CalendarHeader;