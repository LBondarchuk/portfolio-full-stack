import { motion } from "motion/react";
import YearSelector from "./YearSelector/YearSelector";
import Button from "../../buttons/Button/Button";
import ArrowDownIcon from "../../Icons/ArrowDown";

type CalendarHeaderProps = {
  currentDate: Date;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onChangeYear: (year: number) => void;
};

const CalendarHeader = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onChangeYear,
}: CalendarHeaderProps) => {
  return (
    <header className="relative z-1  flex items-center justify-between rounded-2xl border border-gray-200/70 bg-white/80 p-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={onPreviousMonth}>
          <ArrowDownIcon className="h-4 w-4 rotate-90" />
        </Button>

        <Button variant="ghost" onClick={onNextMonth}>
          <ArrowDownIcon className="h-4 w-4 -rotate-90" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <motion.h2
          key={`${currentDate.getFullYear()}-${currentDate.getMonth()}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="
            text-lg font-semibold
            capitalize
            tracking-tight
            text-gray-800
            sm:text-xl
          "
        >
          {currentDate.toLocaleString("de-DE", {
            month: "long",
          })}
        </motion.h2>
        <div className="relative">
          <YearSelector currentDate={currentDate} onChangeYear={onChangeYear} />
        </div>
      </div>

      <Button onClick={onToday}>Today</Button>
    </header>
  );
};

export default CalendarHeader;
