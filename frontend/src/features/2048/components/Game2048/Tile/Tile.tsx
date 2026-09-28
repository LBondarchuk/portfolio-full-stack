import { motion } from "motion/react";
import type { TileT } from "../../../types/game";
import { getTileClass } from "../../../utils/constants";

type Props = {
  tile: TileT;
};
const Tile = ({ tile }: Props) => {
  return (
    <motion.div
      key={tile.id}
      layout
      initial={{
        scale: 0,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
      className={getTileClass(tile.value)}
      style={{
        gridRow: tile.row + 1,
        gridColumn: tile.col + 1,
      }}
    >
      <span className="text-2xl">
        {tile.value}
      </span>
    </motion.div>
  );
};

export default Tile;
