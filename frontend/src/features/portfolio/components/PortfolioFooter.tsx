import { FiArrowUpRight } from "react-icons/fi";

const PortfolioFooter = () => (
  <footer className="flex flex-col gap-2 border-t border-border py-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
    <span>Leonid Bondarchuk · Frontend-Entwickler</span>
    <a className="transition hover:text-text/70" href="/dashboard">
      Projektübersicht <FiArrowUpRight className="ml-1 inline" />
    </a>
  </footer>
);

export default PortfolioFooter;
