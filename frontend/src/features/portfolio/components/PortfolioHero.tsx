import { motion, useReducedMotion } from "motion/react";
import { FiArrowDown, FiArrowUpRight, FiGlobe, FiMapPin } from "react-icons/fi";

const PortfolioHero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="start"
      className="relative grid min-h-[660px] items-center gap-12 py-16 md:grid-cols-[1fr_0.78fr] md:py-24"
    >
      <div className="pointer-events-none absolute -left-44 top-24 size-[28rem] rounded-full bg-primary/10 blur-[100px]" />
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10"
      >
        <p className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <span className="size-2 rounded-full bg-primary shadow-sm shadow-primary/40" />
          Frontend-Entwickler · React & TypeScript
        </p>
        <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
          Leonid<br />
          <motion.span
            initial={shouldReduceMotion ? false : { opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="inline-block text-primary"
          >
            Bondarchuk
          </motion.span>
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-text-secondary sm:text-xl">
          Seit 2022 entwickle ich Webanwendungen — von Weiterbildung und
          eigenen Pet-Projekten bis zu einem Jahr kommerzieller Erfahrung.
          Mein Schwerpunkt ist React und TypeScript; auch APIs und Backend
          gehören zu meinen Projekten. Jetzt suche ich eine Frontend-Position
          in Deutschland.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-text-secondary">
          <span className="inline-flex items-center gap-2">
            <FiMapPin className="text-primary" />
            Bergisch Gladbach, Deutschland
          </span>
          <span className="inline-flex items-center gap-2">
            <FiGlobe className="text-primary" />
            Ukrainisch · Deutsch · Englisch
          </span>
        </div>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#profil"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            Mein Profil <FiArrowDown />
          </a>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:border-primary/40 hover:bg-gray-light"
          >
            Projekte ansehen <FiArrowUpRight />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={
          shouldReduceMotion ? false : { opacity: 0, scale: 0.94, rotate: 2 }
        }
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.12, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-[390px]"
      >
        {!shouldReduceMotion && (
          <>
            <motion.div
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -inset-8 rounded-[2.7rem] border border-dashed border-primary/35"
            />
            <motion.div
              aria-hidden="true"
              animate={{ rotate: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -inset-12 rounded-[3rem] border border-primary/10"
            />
          </>
        )}
        <div className="absolute -inset-4 rotate-3 rounded-[2rem] border border-primary/20" />
        <div className="relative aspect-[4/4.7] overflow-hidden rounded-[1.7rem] border border-border bg-slate-950">
          <img
            src="/leonid-bondarchuk.png"
            alt="Leonid Bondarchuk, Frontend-Entwickler"
            className="absolute inset-0 size-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-slate-950/10" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl border border-border bg-surface/80 px-4 py-3 backdrop-blur-sm">
            <span className="text-xs text-text-secondary">
              Offen für Stellenangebote
            </span>
            <span className="size-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
          </div>
        </div>
        {!shouldReduceMotion && (
          <>
            <motion.span
              animate={{ y: [0, -9, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-7 top-12 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text shadow-lg shadow-slate-900/10"
            >
              React <span className="ml-1 text-primary">✳</span>
            </motion.span>
            <motion.span
              animate={{ y: [0, 8, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 5, delay: 0.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 top-[42%] rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text shadow-lg shadow-slate-900/10"
            >
              TypeScript <span className="ml-1 text-primary">TS</span>
            </motion.span>
            <motion.span
              animate={{ y: [0, -7, 0], rotate: [0, 2, 0] }}
              transition={{ duration: 4.6, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-2 left-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-text shadow-lg shadow-slate-900/10"
            >
              Zustand <span className="ml-1 text-primary">↗</span>
            </motion.span>
          </>
        )}
      </motion.div>
      <a
        aria-label="Zum Profil scrollen"
        href="#profil"
        className={`absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-text-muted transition hover:text-primary md:block ${shouldReduceMotion ? "" : "animate-bounce"}`}
      >
        <FiArrowDown />
      </a>
    </section>
  );
};

export default PortfolioHero;
