import { FiMoreHorizontal, FiX } from "react-icons/fi";
import Button from "../../../../../../../components/buttons/Button/Button";
type Props = {
  title: string;
  onClose: () => void;
};
const EventDetailsHeader = ({ title, onClose }: Props) => {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-4">
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-text-muted">
          Event details
        </p>

        <h2 className="mt-1 truncate text-sm font-semibold text-text">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-1">
        <Button aria-label="Weitere Optionen" variant="ghost" className="px-2!">
          <FiMoreHorizontal className="size-4.25" />
        </Button>

        <Button
          type="button"
          onClick={onClose}
          aria-label="Termindetails schließen"
          variant="ghost"
          className="px-2!"
        >
          <FiX className="size-4.25" />
        </Button>
      </div>
    </div>
  );
};

export default EventDetailsHeader;
