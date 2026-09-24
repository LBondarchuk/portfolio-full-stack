import { motion } from "motion/react";

type Props = {
  checked: boolean;
  onChange: () => void;
};

const TodoCheckBox = ({ checked, onChange }: Props) => {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onChange()
      }}
      aria-pressed={checked}
      aria-label={checked ? "Mark todo as incomplete" : "Mark todo as complete"}
      className="group grid h-6 w-6 shrink-0 place-items-center rounded-md cursor-pointer"
    >
      <motion.span
        initial={false}
        animate={{
          backgroundColor: checked ? "var(--color-primary)" : "transparent",
          borderColor: checked
            ? "var(--color-primary)"
            : "var(--color-border)",
          scale: checked ? 1 : 0.95,
        }}
        transition={{
          duration: 0.18,
          ease: "easeOut",
        }}
        className="grid h-5 w-5 place-items-center rounded-md border-2"
      >
        <motion.svg
          initial={false}
          animate={{
            opacity: checked ? 1 : 0,
            scale: checked ? 1 : 0.6,
          }}
          transition={{ duration: 0.15 }}
          viewBox="0 0 24 24"
          className="h-3.5 w-3.5 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12.5 9.5 17 19 7.5" />
        </motion.svg>
      </motion.span>
    </button>
  );
};

export default TodoCheckBox;