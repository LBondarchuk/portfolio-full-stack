import type { TileT } from "../../types/game";

const getRandomValue = () => {
  return Math.random() < 0.9 ? 2 : 4;
};

const createId = () => Date.now() + Math.random();

export const createTile = (
  row: number,
  col: number,
  value = getRandomValue(),
): TileT => {
  return {
    id: createId(),
    value,
    row,
    col,
  };
};