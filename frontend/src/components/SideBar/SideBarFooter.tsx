import { Link } from "react-router";

type Props = {
  onClose: () => void;
};

const SideBarFooter = ({ onClose }: Props) => (
  <div className="mt-auto border-t border-white/10 px-5 py-5">
    <Link
      to="/"
      onClick={onClose}
      className="mb-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      <span aria-hidden="true">←</span>
      Zur persönlichen Seite
    </Link>
    <p className="text-[10px] leading-4 text-white/40">
      React · TypeScript · Full-Stack
    </p>
  </div>
);

export default SideBarFooter;
