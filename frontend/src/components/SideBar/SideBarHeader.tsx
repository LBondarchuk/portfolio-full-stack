import { Link } from "react-router";

const SideBarHeader = () => (
  <div className="flex items-center gap-3 px-5 pb-5">
    <Link
      to="/"
      aria-label="Zur persönlichen Seite"
      className="shrink-0 rounded-xl transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <img
        src="/lb-logo.png"
        alt=""
        className="size-11 rounded-xl object-cover shadow-md shadow-orange-950/20"
      />
    </Link>
    <div className="min-w-0">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
        Arbeitsbereich
      </p>
      <p className="mt-1 text-sm font-semibold text-white">
        Entwickler-Dashboard
      </p>
    </div>
  </div>
);

export default SideBarHeader;
