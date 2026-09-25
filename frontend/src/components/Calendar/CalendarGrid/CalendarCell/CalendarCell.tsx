import { motion } from "motion/react";

type CalendarCellProps = {
  type?: "current" | "adjacent";
  children: React.ReactNode;
  onClick?:()=> void
};

const CalendarCell = ({
  type = "current",
  children,
  onClick,
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

          group-hover:border-orange-300
          group-hover:shadow-lg
          group-hover:shadow-orange-900/10
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
            relative 
            text-sm font-semibold
            transition-transform duration-300
            group-hover:scale-110

            ${
              isAdjacent
                ? "text-gray-400"
                : "text-gray-700"
            }
          `}
        >
          {children}
        </span>

        {!isAdjacent && (
          <span
            className="
              absolute
              bottom-3
              h-1.5
              w-1.5
              rounded-full
              bg-orange-400
              opacity-0
              scale-50
              transition-all duration-300
              group-hover:scale-100
              group-hover:opacity-100
            "
          />
        )}
      </div>
    </motion.div>
  );
};

export default CalendarCell;