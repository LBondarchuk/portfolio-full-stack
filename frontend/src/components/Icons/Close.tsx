import { IoCloseSharp } from "react-icons/io5";
import type { IconProps } from "./types.icon";

const CloseIcon = ({ onClick,className }: IconProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close modal"
      className={`grid h-9 w-9 place-items-center rounded-md text-text-secondary transition-colors duration-200 hover:bg-gray-light hover:text-text  ${className}`}
    >
      <IoCloseSharp className="h-5 w-5" />
    </button>
  );
};

export default CloseIcon;