
type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: string;
};

const Input = ({
  className,
  error,
  ...props
}: Props) => {
  return (
    <div>
      <input
        {...props}
        className={`rounded-md border w-full border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary ${
          error ? "border-danger" : ""
        } ${className ?? ""}`}
      />

      {error && (
        <p className=" text-xs text-danger text-left ">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;

