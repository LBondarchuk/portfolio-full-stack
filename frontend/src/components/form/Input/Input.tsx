type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
const Input = ({className,...props}: Props) => {
  return (
    <input
    {...props}
      className={`rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary ${className}`}
    />
  );
};

export default Input;
