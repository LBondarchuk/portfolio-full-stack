type Props<T extends object> = {
  name: keyof T;
  title: string;
  children: React.ReactNode;
};

const FormField = <T extends object>({
  name,
  title,
  children,
}: Props<T>) => (
  <div className="grid gap-1.5">
    <label htmlFor={String(name)} className="text-sm font-medium text-text">
      {title}
    </label>

    {children}
  </div>
);

export default FormField;