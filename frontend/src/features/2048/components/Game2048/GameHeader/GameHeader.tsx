import Button from "../../../../../components/buttons/Button/Button";
import PageHeader from "../../../../../components/PageHeader/PageHeader";

type Props = {
  restart: () => void;
};
const GameHeader = ({ restart }: Props) => {
  return (
    <div className="mb-8 grid w-full grid-cols-[1fr_auto] gap-2">
      <PageHeader
        title="Zahlenrausch · 2048"
        description="Spiele den Klassiker und übertriff deinen persönlichen Rekord."
      />

      <Button onClick={restart} className="text-nowrap h-fit ">
        Neues Spiel
      </Button>
    </div>
  );
};

export default GameHeader;
