import { FiEdit } from "react-icons/fi";
import type { IconProps } from "./types.icon";

const EditIcon = ({ onClick, className }: IconProps) => {
  return (
   <FiEdit 
      className={`h-5 w-5 transition    ${className}`}
      onClick={onClick}
    />
  );
};

export default EditIcon;
