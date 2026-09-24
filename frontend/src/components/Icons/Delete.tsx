import { MdDeleteOutline } from "react-icons/md";
import type { IconProps } from "./types.icon";

const DeleteIcon = ({ onClick, className }: IconProps) => {
  return (
    <MdDeleteOutline
      onClick={onClick}
      className={`
        h-5 w-5
        cursor-pointer
        text-danger
        transition-colors duration-200
        hover:text-danger/80
        ${className}
      `}
    />
  );
};

export default DeleteIcon;