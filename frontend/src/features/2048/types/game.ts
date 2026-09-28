export type Direction = "up" | "down" | "left" | "right";

export type GameStatus = "playing" | "won" | "game-over";

export type TileT = {
  id: number;
  value: number;
  row: number;
  col: number;
};