import type { Direction, TileT } from "../../types/game";
import { getLineCoordinates } from "../boardUtils/getLineCoordinates";
import { BOARD_SIZE } from "../constants";

export const moveTiles = (tiles: TileT[], direction: Direction) => {
  const nextTiles: TileT[] = [];

  let scoreGained = 0;
  let moved = false;

  for (let line = 0; line < BOARD_SIZE; line++) {
    const coordinates = getLineCoordinates(direction, line);

    const lineTiles = coordinates
      .map(({ row, col }) =>
        tiles.find((tile) => tile.row === row && tile.col === col),
      )
      .filter((tile): tile is TileT => Boolean(tile));

    let targetIndex = 0;

    for (let i = 0; i < lineTiles.length; i++) {
      const current = lineTiles[i];
      const next = lineTiles[i + 1];
      const target = coordinates[targetIndex];

      if (next && current.value === next.value) {
        nextTiles.push({
          id: current.id,
          value: current.value * 2,
          row: target.row,
          col: target.col,
        });

        scoreGained += current.value * 2;

        if (
          current.row !== target.row ||
          current.col !== target.col ||
          next.row !== target.row ||
          next.col !== target.col
        ) {
          moved = true;
        }

        i++;
        targetIndex++;
      } else {
        nextTiles.push({
          ...current,
          row: target.row,
          col: target.col,
        });

        if (current.row !== target.row || current.col !== target.col) {
          moved = true;
        }

        targetIndex++;
      }
    }
  }

  return {
    tiles: nextTiles,
    scoreGained,
    moved,
  };
};
