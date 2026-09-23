type Props<T extends object> = {
  name: keyof T;
  title: string;
  children: React.ReactNode;
  className?: string
};

const FormField = <T extends object>({
  name,
  title,
  children,
  className
}: Props<T>) => (
  <div className={`grid gap-1.5 ${className}`}>
    <label htmlFor={String(name)} className="text-sm font-medium text-text">
      {title}
    </label>

    {children}
  </div>
);

export default FormField;