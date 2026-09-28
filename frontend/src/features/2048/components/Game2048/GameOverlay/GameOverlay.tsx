import { AnimatePresence, motion } from "motion/react";
import type { GameStatus } from "../../../types/game";
import Button from "../../../../../components/buttons/Button/Button";

type Props = {
  status: GameStatus;
  restart: () => void;
};
const GameOverlay = ({ status, restart }: Props) => {
  return (
    <AnimatePresence>
      {status !== "playing" && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="
                  absolute
                  inset-0
                  grid
                  place-items-center
                  rounded-[28px]
                  bg-white/80
                  p-6
                  backdrop-blur-md
                "
        >
          <motion.div
            initial={{
              scale: 0.85,
              y: 20,
            }}
            animate={{
              scale: 1,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="
                    w-full
                    max-w-xs
                    rounded-3xl
                    border
                    border-border
                    bg-surface
                    p-8
                    text-center
                    shadow-2xl
                    shadow-slate-200
                  "
          >
            <h2 className="text-3xl font-black text-text">
              {status === "won" ? "You won!" : "Game over!"}
            </h2>

            <p className="mt-2 text-sm text-text-secondary">
              {status === "won"
                ? "You reached 2048!"
                : "There are no more possible moves."}
            </p>

            <Button onClick={restart}>New Game</Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameOverlay;
