import { useReducedMotion } from "motion/react";

const useReveal = () => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) return {};

  return {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.16 },
    transition: { duration: 0.65, ease: "easeOut" },
  };
};

export default useReveal;
