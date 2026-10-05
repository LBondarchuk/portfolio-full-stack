import { motion, useReducedMotion } from "motion/react";
import { FiArrowUpRight } from "react-icons/fi";

const PortfolioHeader = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="sticky top-3 z-50 py-3"
    >
      <nav
        aria-label="Hauptnavigation"
        className="flex items-center justify-between rounded-2xl border border-white/70 bg-surface/85 px-3 py-2 shadow-lg shadow-slate-900/5 backdrop-blur-xl sm:px-4"
      >
        <a
          href="#start"
          aria-label="Leonid Bondarchuk — Startseite"
          className="group flex min-w-0 items-center gap-2.5 rounded-xl p-1 transition hover:bg-gray-light/70"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-xs font-extrabold tracking-tight text-white shadow-sm shadow-primary/25 transition group-hover:rotate-[-5deg]">
            LB<span className="text-orange-200">.</span>
          </span>
          <span className="hidden min-w-0 sm:block">
            <span className="block truncate text-sm font-bold leading-4 tracking-tight text-text">
              Leonid Bondarchuk
            </span>
            <span className="mt-1 block text-[10px] leading-3 text-text-muted">
              Frontend-Entwickler
            </span>
          </span>
        </a>

        <div className="flex items-center gap-0.5 text-xs font-medium sm:gap-1">
          <a
            className="rounded-xl px-2.5 py-2 text-text-secondary transition hover:bg-gray-light hover:text-text sm:px-3"
            href="#profil"
          >
            Profil
          </a>
          <a
            className="hidden rounded-xl px-3 py-2 text-text-secondary transition hover:bg-gray-light hover:text-text md:inline-flex"
            href="#erfahrung"
          >
            Erfahrung
          </a>
          <a
            className="rounded-xl px-2.5 py-2 text-text-secondary transition hover:bg-gray-light hover:text-text sm:px-3"
            href="#kontakt"
          >
            Kontakt
          </a>
          <a
            className="ml-1 inline-flex items-center gap-1 rounded-xl border border-primary text-primary px-3 py-2 font-semibold hover:text-white shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-md hover:shadow-primary/20 sm:ml-2 sm:px-4"
            href="/dashboard"
          >
            Projekte <FiArrowUpRight className="size-3.5" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
};

export default PortfolioHeader;
