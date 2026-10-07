import { motion } from "motion/react";

type CalendarCellProps = {
  type?: "current" | "adjacent";
  children: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  date: Date

};

const CalendarCell = ({
  type = "current",
  children,
  onClick,
  isActive = false,

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
                border-border/60
                bg-background/70
                text-text-muted
              `
              : `
                border-border
                bg-surface
                text-text
                shadow-sm
                shadow-black/5
              `
          }

          ${
            isActive
              ? `
                border-primary
                bg-primary-light
                shadow-md
                shadow-primary/10
              `
              : `
                group-hover:border-primary/50
                group-hover:bg-primary-light/40
                group-hover:shadow-lg
                group-hover:shadow-primary/10
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
            from-primary/10
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
                ? "text-primary"
                : isAdjacent
                  ? "text-text-muted"
                  : "text-text"
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
