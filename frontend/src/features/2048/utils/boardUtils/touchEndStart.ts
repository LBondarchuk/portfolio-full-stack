import type { TouchEvent } from "react";
import type { Direction } from "../../types/game";
export const handleTouchEnd = (
  event: TouchEvent<HTMLDivElement>,
  touchStart: React.RefObject<{
    x: number;
    y: number;
  } | null>,
  move: (direction: Direction) => void,
) => {
  if (!touchStart.current) {
    return;
  }

  const touch = event.changedTouches[0];

  const deltaX = touch.clientX - touchStart.current.x;

  const deltaY = touch.clientY - touchStart.current.y;

  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);

  const minSwipeDistance = 30;

  if (Math.max(absX, absY) < minSwipeDistance) {
    touchStart.current = null;
    return;
  }

  if (absX > absY) {
    move(deltaX > 0 ? "right" : "left");
  } else {
    move(deltaY > 0 ? "down" : "up");
  }

  touchStart.current = null;
};

export const handleTouchStart = (
  event: TouchEvent<HTMLDivElement>,
  touchStart: React.RefObject<{
    x: number;
    y: number;
  } | null>,
) => {
  const touch = event.touches[0];

  touchStart.current = {
    x: touch.clientX,
    y: touch.clientY,
  };
};