import { motion } from "motion/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SideBarBackdrop = ({ isOpen, onClose }: Props) => (
  <motion.button
    type="button"
    aria-label="Navigation schließen"
    aria-hidden={!isOpen}
    tabIndex={isOpen ? 0 : -1}
    onClick={onClose}
    initial={false}
    animate={{
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? "auto" : "none",
    }}
    transition={{ duration: 0.2 }}
    className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
  />
);

export default SideBarBackdrop;
