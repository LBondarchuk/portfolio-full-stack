import GameHeader from "./GameHeader/GameHeader";
import ScoreBoard from "./ScoreBoard/ScoreBoard";
import Board from "./Board/Board";
import { useGame2048 } from "./hooks/useGame2048";

const Game2048 = () => {
  const {
    tiles,
    score,
    bestScore,
    status,
    restart,
    handleBoardTouchStart,
    handleBoardTouchEnd,
  } = useGame2048();

  return (
    <div>
      <GameHeader restart={restart} />

      <ScoreBoard
        score={score}
        bestScore={bestScore}
      />

      <Board
        tiles={tiles}
        status={status}
        restart={restart}
        handleTouchStart={handleBoardTouchStart}
        handleTouchEnd={handleBoardTouchEnd}
      />

      <p className="mt-6 text-center text-sm text-text-muted">
        Use arrow keys or WASD to play.
      </p>
    </div>
  );
};

export default Game2048;