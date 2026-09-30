import type { Direction } from "../../types/game";

export const handleKeyDown = (
  event: KeyboardEvent,
  move: (direction: Direction) => void,
) => {
  const keyMap: Record<string, Direction> = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
    w: "up",
    W: "up",
    s: "down",
    S: "down",
    a: "left",
    A: "left",
    d: "right",
    D: "right",
  };

  const direction = keyMap[event.key];

  if (!direction) {
    return;
  }

  event.preventDefault();
  move(direction);
};
