import { motion } from "motion/react";

type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Loader = ({ size = "md", className = "" }: Props) => {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`grid place-items-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "linear",
        }}
        className={`
          rounded-full
          border-border
          border-t-primary
          ${sizeClasses[size]}
        `}
      />
    </div>
  );
};

export default Loader;