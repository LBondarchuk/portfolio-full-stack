import { GoClock } from "react-icons/go";
import type { IconProps } from "./types.icon";

const ClockIcon = ({ onClick, className }: IconProps) => {
  return (
    <GoClock className={`h-5 w-5 transition  ${className}`} onClick={onClick} />
  );
};

export default ClockIcon;
