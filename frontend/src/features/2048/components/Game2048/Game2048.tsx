import { useCallback, useEffect, useRef, useState } from "react";
import GameHeader from "./GameHeader/GameHeader";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import Board from "./Board/Board";
import type { Direction, GameStatus, TileT } from "../../types/game";
import { WINNING_TILE } from "../../utils/constants";
import {
  handleTouchEnd,
  handleTouchStart,
} from "../../utils/boardUtils/touchEndStart";
import { handleKeyDown } from "../../utils/boardUtils/handleKeyDown";
import { createInitialTiles } from "../../utils/gameLogic/createInitialTiles";
import { moveTiles } from "../../utils/gameLogic/moveTiles";
import { addRandomTile } from "../../utils/gameLogic/addRandomTile";
import { hasAvailableMoves } from "../../utils/gameLogic/hasAvailableMoves";

const Game2048 = () => {
  const [tiles, setTiles] = useState<TileT[]>(createInitialTiles);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === "undefined") {
      return 0;
    }
    const saved = localStorage.getItem("2048-best-score");

    return saved ? Number(saved) : 0;
  });

  const [status, setStatus] = useState<GameStatus>("playing");
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const restart = useCallback(() => {
    setTiles(createInitialTiles());
    setScore(0);
    setStatus("playing");
  }, []);

  const move = useCallback(
    (direction: Direction) => {
      if (status !== "playing") {
        return;
      }

      const result = moveTiles(tiles, direction);

      if (!result.moved) {
        return;
      }

      const nextTiles = addRandomTile(result.tiles);
      const nextScore = score + result.scoreGained;

      setTiles(nextTiles);
      setScore(nextScore);

      if (nextScore > bestScore) {
        setBestScore(nextScore);

        localStorage.setItem("2048-best-score", String(nextScore));
      }

      const hasWon = nextTiles.some((tile) => tile.value >= WINNING_TILE);

      if (hasWon) {
        setStatus("won");
        return;
      }

      if (!hasAvailableMoves(nextTiles)) {
        setStatus("game-over");
      }
    },
    [tiles, score, bestScore, status],
  );

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      handleKeyDown(event, move);
    };

    window.addEventListener("keydown", keyDownHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
    };
  }, [move]);

  return (
    <div>
      <GameHeader restart={restart} />
      <ScoreBoard score={score} bestScore={bestScore} />

      <Board
        tiles={tiles}
        status={status}
        restart={restart}
        handleTouchEnd={(e) => handleTouchEnd(e, touchStart, move)}
        handleTouchStart={(e) => handleTouchStart(e, touchStart)}
      />

      <p className="mt-6 text-center text-sm text-text-muted">
        Use arrow keys or WASD to play.
      </p>
    </div>
  );
};

export default Game2048;
