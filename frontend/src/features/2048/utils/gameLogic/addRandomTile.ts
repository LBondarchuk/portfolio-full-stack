import type { TileT } from "../../types/game";
import { createTile } from "../boardUtils/createTile";
import { getEmptyCells } from "../boardUtils/getEmptyCells";

export const addRandomTile = (tiles: TileT[]): TileT[] => {
  const emptyCells = getEmptyCells(tiles);

  if (emptyCells.length === 0) {
    return tiles;
  }

  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  return [...tiles, createTile(randomCell.row, randomCell.col)];
};
