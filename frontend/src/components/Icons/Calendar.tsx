import { FiCalendar } from "react-icons/fi";
import type { IconProps } from "./types.icon";

const CalendarIcon = ({ onClick, className }: IconProps) => {
  return (
   <FiCalendar 
      className={`h-5 w-5 transition  text-primary  ${className}`}
      onClick={onClick}
    />
  );
};

export default CalendarIcon;
