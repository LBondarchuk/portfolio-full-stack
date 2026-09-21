import type { ReactNode } from "react";

type SelectItemProps = {
  children: ReactNode;
  onClick: () => void;
    isSelected?: boolean;
  className?:string
};

const SelectItem = ({
  children,
  onClick,
    isSelected = false,
  className,
}: SelectItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
        isSelected
          ? "bg-gray-light text-text"
          : "text-text hover:bg-gray-light"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default SelectItem;