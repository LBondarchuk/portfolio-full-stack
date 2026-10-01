import { motion } from "motion/react";
import type { CalendarVariant } from "../../Calendar";

type CalendarCellProps = {
  type?: "current" | "adjacent";
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  date: Date
  calendarVariant?: CalendarVariant 
};

const CalendarCell = ({
  type = "current",
  children,
  onClick,
  isActive = false,
  calendarVariant,
}: CalendarCellProps) => {
  const isAdjacent = type === "adjacent";

  return (
    <motion.div
      onClick={onClick}
      whileHover={{
        y: -3,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 22,
      }}
      className="group relative aspect-square cursor-pointer p-1"
    >
      <div
        className={`
          relative flex h-full w-full items-center justify-center
          overflow-hidden rounded-2xl
          border
          transition-all duration-300

          ${
            isAdjacent
              ? `
                border-gray-200/60
                bg-gray-50/70
                text-gray-400
              `
              : `
                border-orange-200/70
                bg-orange-50
                text-gray-800
                shadow-sm
                shadow-orange-900/5
              `
          }

          ${
            isActive
              ? `
                border-orange-400
                bg-orange-100
                shadow-md
                shadow-orange-900/10
              `
              : `
                group-hover:border-orange-300
                group-hover:shadow-lg
                group-hover:shadow-orange-900/10
              `
          }
        `}
      >
        <div
          className="
            pointer-events-none
            absolute inset-0
            rounded-2xl
            bg-linear-to-br
            from-orange-400/10
            via-transparent
            to-transparent
            opacity-0
            transition-opacity duration-300
            group-hover:opacity-100
          "
        />

        <span
          className={`
            relative z-10
            text-sm font-semibold
            transition-transform duration-300
            group-hover:scale-110

            ${
              isActive
                ? "text-orange-700"
                : isAdjacent
                  ? "text-gray-400"
                  : "text-gray-700"
            }
          `}
        >
          {children}
        </span>

   
      </div>
    </motion.div>
  );
};

export default CalendarCell;
