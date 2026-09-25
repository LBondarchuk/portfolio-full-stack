type ButtonVariant = "default" | "outlined" | "danger" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const Button = ({
  children,
  variant = "default",
  disabled,
  className = "",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-md px-4 py-2 transition-colors duration-200";

  const variantStyles = {
    default:
      "bg-primary text-white hover:bg-primary-hover",

    outlined:
      "border border-primary bg-surface text-primary hover:bg-primary/10",

    danger:
      "bg-red-50 text-danger hover:bg-red-100",

    ghost:
      "bg-transparent text-text-secondary hover:bg-gray-light hover:text-text",
  };

  const disabledStyles = disabled
    ? "cursor-not-allowed opacity-50"
    : "cursor-pointer";

  return (
    <button
      {...props}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${disabledStyles}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;