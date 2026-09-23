import { MdFilterListAlt } from "react-icons/md";
import type { IconProps } from "./types.icon";

const FilterIcon = ({ onClick, className }: IconProps) => {
  return (
   <MdFilterListAlt 
      className={`h-5 w-5 transition  text-primary  ${className}`}
      onClick={onClick}
    />
  );
};

export default FilterIcon;
