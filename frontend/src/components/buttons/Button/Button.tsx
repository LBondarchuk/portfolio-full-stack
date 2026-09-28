import { motion, type HTMLMotionProps } from "motion/react";
import { baseStyles, variantStyles } from "./buttonVariants";

type ButtonVariant = "default" | "outlined" | "danger" | "ghost";

type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

const Button = ({
  children,
  variant = "default",
  disabled,
  className = "",
  ...props
}: ButtonProps) => {

  const disabledStyles = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer";

  return (
    <motion.button
      {...props}
      disabled={disabled}
      whileHover={
        disabled
          ? undefined
          : {
              y: -2,
              scale: 1.02,
            }
      }
      whileTap={
        disabled
          ? undefined
          : {
              scale: 0.95,
              y: 1,
            }
      }
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 24,
        mass: 0.7,
      }}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${disabledStyles}
        ${className}
      `}
    >
      {variant === "default" && !disabled && (
        <motion.span
          initial={{
            x: "-150%",
            opacity: 0,
          }}
          whileHover={{
            x: "150%",
            opacity: 0.18,
          }}
          transition={{
            duration: 0.65,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            -left-1/2
            w-1/2
            rotate-12
            bg-white
            blur-md
          "
        />
      )}

      {variant === "outlined" && !disabled && (
        <motion.span
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileHover={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-xl
            bg-primary/5
            shadow-[inset_0_0_18px_rgba(0,0,0,0.03)]
          "
        />
      )}

      {variant === "danger" && !disabled && (
        <motion.span
          initial={{
            opacity: 0,
            scale: 0.7,
          }}
          whileHover={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-xl
            bg-red-500/5
            shadow-[inset_0_0_20px_rgba(239,68,68,0.08)]
          "
        />
      )}

      {variant === "ghost" && !disabled && (
        <motion.span
          initial={{
            opacity: 0,
            scale: 0.85,
          }}
          whileHover={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-xl
            bg-primary/5
          "
        />
      )}

      {variant === "ghost" && !disabled && (
        <motion.span
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileHover={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.25,
            ease: "easeOut",
          }}
          className="
            pointer-events-none
            absolute
            bottom-1
            left-1/2
            h-0.5
            w-8
            -translate-x-1/2
            origin-center
            rounded-full
            bg-primary
          "
        />
      )}

      <span className="relative z-10">
        {children}
      </span>
    </motion.button>
  );
};

export default Button;