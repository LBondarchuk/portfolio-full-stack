import { AnimatePresence,  } from "motion/react";
import type { TouchEventHandler } from "react";
import type { GameStatus, TileT } from "../../../types/game";
import GameOverlay from "../GameOverlay/GameOverlay";
import Tile from "../Tile/Tile";

type Props = {
  tiles: TileT[];
  status: GameStatus;
  restart: () => void;
  handleTouchStart: TouchEventHandler<HTMLDivElement>;
  handleTouchEnd: TouchEventHandler<HTMLDivElement>;
};


const Board = ({
  tiles,
  status,
  restart,
  handleTouchStart,
  handleTouchEnd,
}: Props) => {
  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="
        relative
        aspect-square
        w-full
        max-w-130
        touch-none
        rounded-[28px]
        border
        border-border
        bg-surface
        p-3
        shadow-xl
        shadow-slate-200/60
        mx-auto
      "
    >
      <div className="relative grid h-full w-full grid-cols-4 grid-rows-4 gap-3">
        {Array.from({ length: 16 }).map((_, index) => {
          const row = Math.floor(index / 4);
          const col = index % 4;

          return (
            <div
              key={`cell-${index}`}
              className="
                  rounded-2xl
                  border
                  border-border
                  bg-gray-light/50
                "
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
              }}
            />
          );
        })}
        <AnimatePresence>
          {tiles.map((tile) => (
           <Tile tile={tile} key={tile.id}/>
          ))}
        </AnimatePresence>
      </div>
      <GameOverlay status={status} restart={restart} />
    </div>
  );
};

export default Board;
