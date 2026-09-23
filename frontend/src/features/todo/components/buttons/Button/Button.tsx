type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`rounded-md bg-primary px-4 py-2 text-white hover:bg-primary-hover  ${props.className}`}
    >
      {children}
    </button>
  );
};

export default Button;