import type { TileT } from "../../types/game";
import { BOARD_SIZE } from "../constants";

export const hasAvailableMoves = (tiles: TileT[]) => {
  if (tiles.length < BOARD_SIZE * BOARD_SIZE) {
    return true;
  }

  for (const tile of tiles) {
    const neighbors = [
      {
        row: tile.row + 1,
        col: tile.col,
      },
      {
        row: tile.row - 1,
        col: tile.col,
      },
      {
        row: tile.row,
        col: tile.col + 1,
      },
      {
        row: tile.row,
        col: tile.col - 1,
      },
    ];

    for (const neighbor of neighbors) {
      const other = tiles.find(
        (item) => item.row === neighbor.row && item.col === neighbor.col,
      );

      if (other && other.value === tile.value) {
        return true;
      }
    }
  }

  return false;
};
