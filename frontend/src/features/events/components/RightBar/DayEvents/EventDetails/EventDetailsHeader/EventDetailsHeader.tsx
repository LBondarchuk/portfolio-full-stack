import { FiMoreHorizontal, FiX } from "react-icons/fi";
type Props = {
    title: string
    onClose:()=> void
}
const EventDetailsHeader = ({title, onClose}:Props) => {
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
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-light hover:text-text"
            aria-label="More options"
          >
            <FiMoreHorizontal className="size-4.25" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-lg text-text-secondary transition-colors hover:bg-gray-light hover:text-text"
            aria-label="Close event details"
          >
            <FiX className="size-4.25" />
          </button>
        </div>
      </div>
  );
};

export default EventDetailsHeader;