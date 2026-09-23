import { motion } from "motion/react";

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const MenuButton = ({ isOpen, toggleSidebar }: Props) => {
  return (
    <motion.button
      type="button"
      onClick={toggleSidebar}
      whileTap={{ scale: 0.62 }}
      className="relative grid h-11 w-11 place-items-center rounded-xl cursor-pointer"
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
    >
      <motion.span
        animate={{
          y: isOpen ? 0 : -7,
          rotate: isOpen ? 45 : 0,
          width: isOpen ? 24 : 24,
          backgroundColor: isOpen ? "white" : "var(--color-primary)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="absolute h-1 origin-center rounded-full"
      />

      <motion.span
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
          backgroundColor: isOpen ? "white" : "var(--color-primary)",
        }}
        transition={{
          duration: 0.12,
        }}
        className="absolute h-1 w-6 rounded-full "
      />

      <motion.span
        animate={{
          y: isOpen ? 0 : 7,
          rotate: isOpen ? -45 : 0,
          width: isOpen ? 24 : 24,
          backgroundColor: isOpen ? "white" : "var(--color-primary)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="absolute h-1 origin-center rounded-full bg-white"
      />
    </motion.button>
  );
};

export default MenuButton;
