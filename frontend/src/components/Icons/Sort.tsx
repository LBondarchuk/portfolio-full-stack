import { TbArrowsSort } from "react-icons/tb";
import type { IconProps } from "./types.icon";

const SortIcon = ({ onClick, className }: IconProps) => {
  return (
  <TbArrowsSort 
      className={`h-5 w-5 transition  text-primary  ${className}`}
      onClick={onClick}
    />
  );
};

export default SortIcon;
