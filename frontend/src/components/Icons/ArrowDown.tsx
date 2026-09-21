import { IoChevronDownSharp } from "react-icons/io5";
import type { IconProps } from "./types.icon";


const ArrowDownIcon = ({ onClick, className }: IconProps) => {
  return (
    <IoChevronDownSharp
      className={`h-5 w-5 transition cursor-pointer text-text-secondary hover:text-text ${className}`}
      onClick={onClick}
    />
  );
};

export default ArrowDownIcon;
