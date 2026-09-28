import type { TileT } from "../../types/game";
import { BOARD_SIZE } from "../constants";

export const getEmptyCells = (tiles: TileT[]) => {
  const emptyCells: { row: number; col: number }[] = [];

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const occupied = tiles.some(
        (tile) => tile.row === row && tile.col === col,
      );

      if (!occupied) {
        emptyCells.push({ row, col });
      }
    }
  }

  return emptyCells;
};