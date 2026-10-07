type Props = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  error?: React.ReactNode;
};

const Textarea = ({ className, error, maxLength, ...props }: Props) => {
  return (
    <div>
      <textarea
        {...props}
        maxLength={maxLength}
        className={`w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-text outline-none transition-colors duration-200 focus:border-primary ${
          error ? "border-danger" : ""
        } ${className ?? ""}`}
      />

      <div className=" flex items-center justify-between">
        {error ? <p className="text-xs text-danger">{error}</p> : <span />}

        {maxLength && (
          <span className="text-xs text-text-muted">
            Max. {maxLength} characters
          </span>
        )}
      </div>
    </div>
  );
};

export default Textarea;
