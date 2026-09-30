import type { TileT } from "../../types/game";
import { createTile } from "../boardUtils/createTile";
import { getEmptyCells } from "../boardUtils/getEmptyCells";

export const createInitialTiles = (): TileT[] => {
  const tiles: TileT[] = [];

  const firstEmpty = getEmptyCells(tiles);
  const firstCell = firstEmpty[Math.floor(Math.random() * firstEmpty.length)];

  tiles.push(createTile(firstCell.row, firstCell.col));

  const secondEmpty = getEmptyCells(tiles);
  const secondCell =
    secondEmpty[Math.floor(Math.random() * secondEmpty.length)];

  tiles.push(createTile(secondCell.row, secondCell.col));

  return tiles;
};
