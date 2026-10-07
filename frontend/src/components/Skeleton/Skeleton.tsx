
import type { CSSProperties } from "react";

interface SkeletonProps {
  className?: string;
  style?: CSSProperties;
}

const Skeleton = ({ className = "", style }: SkeletonProps) => {
  return (
    <div
      style={style}
      className={`animate-pulse rounded bg-gray-200 ${className}`}
    />
  );
};

export default Skeleton;

