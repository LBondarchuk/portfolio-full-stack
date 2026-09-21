import { IoSearchSharp } from "react-icons/io5";
import type { IconProps } from "./types.icon";

const Search = ({ onClick, className }: IconProps) => {
  return (
    <IoSearchSharp
      className={`h-5 w-5 transition cursor-pointer text-text-secondary hover:text-text ${className}`}
      onClick={onClick}
    />
  );
};

export default Search;
