import type { Direction } from "../../types/game";
import { BOARD_SIZE } from "../constants";

export const getLineCoordinates = (direction: Direction, index: number) => {
  switch (direction) {
    case "left":
      return Array.from({ length: BOARD_SIZE }, (_, col) => ({
        row: index,
        col,
      }));

    case "right":
      return Array.from({ length: BOARD_SIZE }, (_, col) => ({
        row: index,
        col: BOARD_SIZE - 1 - col,
      }));

    case "up":
      return Array.from({ length: BOARD_SIZE }, (_, row) => ({
        row,
        col: index,
      }));

    case "down":
      return Array.from({ length: BOARD_SIZE }, (_, row) => ({
        row: BOARD_SIZE - 1 - row,
        col: index,
      }));
  }
};
