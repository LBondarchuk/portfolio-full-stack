import Button from "../../../../../components/buttons/Button/Button";
import PageHeader from "../../../../../components/PageHeader/PageHeader";

type Props = {
  restart: () => void;
};
const GameHeader = ({ restart }: Props) => {
  return (
    <div className="mb-8 grid w-full grid-cols-[1fr_auto] gap-2">
      <PageHeader
        title="2048"
        description="Play the classic puzzle game and beat your high score."
      />

      <Button onClick={restart} className="text-nowrap h-fit ">
        New Game
      </Button>
    </div>
  );
};

export default GameHeader;
