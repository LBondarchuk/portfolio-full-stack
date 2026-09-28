import Button from "../../../../../components/buttons/Button/Button";

type Props = {
  restart: () => void;
};
const GameHeader = ({ restart }: Props) => {
  return (
    <div className="mb-8 grid w-full grid-cols-[1fr_auto] gap-2">
      <div>
        <h1 className="md:text-3xl font-bold text-text"> 2048</h1>

        <p className="text-base text-text-secondary">
          Join the numbers and get to 2048!
        </p>
      </div>

      <Button onClick={restart} className="text-nowrap h-fit ">New Game</Button>
    </div>
  );
};

export default GameHeader;
