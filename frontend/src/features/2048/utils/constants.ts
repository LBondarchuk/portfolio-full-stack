export const BOARD_SIZE = 4;

export const INITIAL_TILES = 2;

export const WINNING_TILE = 2048;

export const getTileClass = (value: number) => {
  const base =
    "grid h-full w-full place-items-center rounded-2xl font-black shadow-sm select-none";

  switch (value) {
    case 2:
      return `${base} bg-gray-light text-text`;

    case 4:
      return `${base} bg-primary-light text-text`;

    case 8:
      return `${base} bg-orange-200 text-orange-950`;

    case 16:
      return `${base} bg-orange-300 text-white`;

    case 32:
      return `${base} bg-orange-400 text-white`;

    case 64:
      return `${base} bg-primary text-white`;

    case 128:
      return `${base} bg-primary-hover text-white shadow-md shadow-orange-200`;

    case 256:
      return `${base} bg-orange-700 text-white shadow-md shadow-orange-200`;

    case 512:
      return `${base} bg-gray-dark text-white shadow-md`;

    case 1024:
      return `${base} bg-slate-700 text-white shadow-lg`;

    case 2048:
      return `${base} bg-primary text-white shadow-xl shadow-orange-200`;

    default:
      return `${base} bg-primary text-white`;
  }
};