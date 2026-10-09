
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  FiArrowUpRight,
  FiCode,
  FiLayers,
  FiTerminal,
} from "react-icons/fi";

import { useTheme, type Theme } from "../../../features/theme/ThemeContext";

type ThemeVideos = Record<Theme, { desktop: string; mobile: string }>;

type ProjectPreviewProps = {
  video: ThemeVideos;
};

const ProjectPreview = ({ video }: ProjectPreviewProps) => {
  const { theme } = useTheme();
  const previewRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [hasVideoLoaded, setHasVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = (event: MediaQueryListEvent) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!previewRef.current || hasEnteredView) return;

    if (!("IntersectionObserver" in window)) {
      setHasEnteredView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEnteredView(true);
        observer.disconnect();
      }
    }, { rootMargin: "120px" });

    observer.observe(previewRef.current);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  useEffect(() => {
    setHasVideoError(false);
    setHasVideoLoaded(false);
    const element = videoRef.current;
    if (!element) return;

    element.playbackRate = 1.2;
    void element.play().catch(() => {});
  }, [hasEnteredView, isMobile, theme]);

  const showVideo = hasEnteredView && !hasVideoError;

  return (
    <div ref={previewRef} className="absolute inset-0 bg-gradient-to-br from-gray-light via-surface to-primary-light">
      {hasEnteredView && !hasVideoLoaded && !hasVideoError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse p-5 sm:p-8"
        >
          <div className="flex h-full flex-col justify-between rounded-xl border border-white/30 bg-surface/20 p-4 backdrop-blur-[2px] sm:p-6">
            <div className="flex items-center justify-between">
              <span className="h-7 w-7 rounded-md bg-text-muted/20" />
              <span className="h-5 w-24 rounded-full bg-text-muted/20" />
            </div>
            <div className="space-y-3">
              <span className="block h-3 w-2/3 rounded-full bg-text-muted/20" />
              <span className="block h-3 w-1/2 rounded-full bg-text-muted/15" />
              <span className="block h-24 rounded-lg bg-text-muted/15 sm:h-36" />
            </div>
          </div>
        </div>
      )}
      {showVideo && (
        <video
          key={`${theme}-${isMobile ? "mobile" : "desktop"}`}
          ref={videoRef}
          src={video[theme][isMobile ? "mobile" : "desktop"]}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={(event) => {
            event.currentTarget.playbackRate = 1.2;
          }}
          onLoadedData={() => setHasVideoLoaded(true)}
          onError={() => setHasVideoError(true)}
          className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${hasVideoLoaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
};

const projects = [
  {
    number: "01",
    title: "Zeitblick",
    category: "Full-Stack · Planung",
    description:
      "Eine moderne Kalenderanwendung zur Planung des Tages, Verwaltung von Terminen und übersichtlichen Organisation komplexer Zeitpläne.",
    technologies: [
      "React",
      "TypeScript",
      "Zustand",
      "Express",
      "MongoDB",
    ],
    href: "/dashboard/events",
    icon: FiLayers,
    video: {
      light: { desktop: "/events-light.mov", mobile: "/events-light-mobile.mov" },
      dark: { desktop: "/events-dark.mov", mobile: "/events-dark-mobile.mov" },
    },
    featured: true,
  },
  {
    number: "02",
    title: "FokusFlow",
    category: "Full-Stack · Produktivität",
    description:
      "Eine produktive Aufgabenverwaltung mit Suche, Filtern, Sortierung, Seitenwechseln und einer übersichtlichen Fortschrittsanalyse.",
    technologies: [
      "React",
      "TypeScript",
      "Zustand",
      "Recharts",
    ],
    href: "/dashboard/todo",
    icon: FiTerminal,
    video: {
      light: { desktop: "/todo-light.mov", mobile: "/todo-light-mobile.mov" },
      dark: { desktop: "/todo-dark.mov", mobile: "/todo-dark-mobile.mov" },
    },
    featured: false,
  },
  {
    number: "03",
    title: "Zahlenrausch · 2048",
    category: "Frontend · Spiel",
    description:
      "Eine responsive Umsetzung des klassischen 2048-Spiels mit eigener Spiellogik sowie Unterstützung für Tastatur- und Touch-Steuerung.",
    technologies: [
      "React",
      "TypeScript",
      "Spiellogik",
    ],
    href: "/dashboard/2048",
    icon: FiCode,
    video: {
      light: { desktop: "/2048-light.mov", mobile: "/2048-light-mobile.mov" },
      dark: { desktop: "/2048-dark.mov", mobile: "/2048-dark-mobile.mov" },
    },
    featured: false,
  },
];

const DashboardPage = () => (
  <main className="min-h-full text-text">
    {/* ─────────────────────────────────────────────
        HERO
    ───────────────────────────────────────────── */}
    <header className="border-b border-border pb-12 pt-4 sm:pb-16">
      <motion.a
        href="/"
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="group mb-14 inline-flex items-center gap-2 text-xs font-medium text-text-muted transition-colors hover:text-primary"
      >
        <span className="transition-transform duration-200 group-hover:-translate-x-1">
          ←
        </span>
        Zur persönlichen Seite
      </motion.a>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              Ausgewählte Projekte
            </p>
          </div>

          <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            Projekte, die zeigen,
            <span className="block text-primary">
              was ich bauen kann.
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="flex flex-col justify-end"
        >
          <p className="text-sm leading-7 text-text-secondary sm:text-base">
            Eine Auswahl meiner praktischen Arbeiten —
            von Full-Stack-Anwendungen bis zu
            interaktiven Frontend-Projekten.
          </p>

          <div className="mt-6 flex items-center gap-3 text-xs font-medium text-text-muted">
            <span className="h-px w-6 bg-border" />
            React · TypeScript · Full-Stack
          </div>
        </motion.div>
      </div>
    </header>

    {/* ─────────────────────────────────────────────
        PROJECTS
    ───────────────────────────────────────────── */}
    <section
      aria-label="Ausgewählte Projekte"
      className="py-10 sm:py-14"
    >
      <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
          01 / Projekte
        </p>

        <span className="text-xs tabular-nums text-text-muted">
          {projects.length.toString().padStart(2, "0")} Projekte
        </span>
      </div>

      <div className="space-y-5">
        {projects.map((project, index) => {
          const Icon = project.icon;

          return (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className={`group relative overflow-hidden border border-border bg-surface transition-all duration-500 hover:border-text/20 hover:shadow-xl ${
                project.featured
                  ? "lg:grid lg:grid-cols-[1.25fr_0.75fr]"
                  : "lg:grid lg:grid-cols-[0.85fr_1.15fr]"
              }`}
            >
              {/* IMAGE */}
              <div
                className={`relative aspect-[9/16] min-h-0 overflow-hidden bg-gray-light md:aspect-auto ${
                  project.featured
                    ? "md:min-h-[360px] lg:min-h-[440px]"
                    : "md:min-h-[280px] lg:min-h-[360px]"
                } ${
                  !project.featured
                    ? "lg:order-2"
                    : ""
                }`}
              >
                <ProjectPreview
                  video={project.video}
                />

                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />

                {/* Number */}
                <div className="absolute left-5 top-5 flex size-9 items-center justify-center border border-white/60 bg-white/80 text-[10px] font-bold tracking-widest text-text backdrop-blur-md">
                  {project.number}
                </div>

                {/* Category */}
                <div className="absolute right-5 top-5 border border-white/60 bg-white/80 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.15em] text-text-secondary backdrop-blur-md">
                  {project.category}
                </div>

                {/* Icon */}
                <div className="absolute bottom-5 left-5 flex size-12 items-center justify-center border border-white/60 bg-white/85 text-primary shadow-lg backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon className="size-5" />
                </div>
              </div>

              {/* CONTENT */}
              <div
                className={`relative flex flex-col justify-between p-7 sm:p-9 lg:p-11 ${
                  project.featured
                    ? ""
                    : "lg:order-1"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    <span className="h-px w-5 bg-primary" />
                    {project.category}
                  </div>

                  <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                    {project.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-text-secondary sm:text-[15px]">
                    {project.description}
                  </p>
                </div>

                <div className="mt-10">
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-border pt-5">
                    {project.technologies.map(
                      (technology, technologyIndex) => (
                        <span
                          key={technology}
                          className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted"
                        >
                          {technologyIndex > 0 && (
                            <span className="size-1 rounded-full bg-border" />
                          )}

                          {technology}
                        </span>
                      ),
                    )}
                  </div>

                  {/* CTA */}
                  <a
                    href={project.href}
                    className="mt-7 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-text transition-colors hover:text-primary"
                  >
                    {project.href.endsWith("/2048")
                      ? "Spiel starten"
                      : "Projekt ansehen"}

                    <span className="flex size-8 items-center justify-center border border-border transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                      <FiArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>

    {/* ─────────────────────────────────────────────
        PHILOSOPHY
    ───────────────────────────────────────────── */}
    <section className="border-t border-border py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
        <div>
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" />

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
              02 / Arbeitsweise
            </p>
          </div>
        </div>

        <div>
          <h2 className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
            Ich möchte nicht nur Code schreiben,
            <span className="text-text-muted">
              {" "}
              sondern gute Produkte bauen.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-text-secondary sm:text-base">
            Mein Ziel ist es, mich als Frontend- und
            React-Entwickler kontinuierlich
            weiterzuentwickeln, Verantwortung zu übernehmen
            und gemeinsam mit einem guten Team digitale
            Produkte zu entwickeln, die technisch sauber
            und für Menschen angenehm zu benutzen sind.
          </p>

          <a
            href="/#kontakt"
            className="group mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.12em] text-primary"
          >
            Interesse an einer Zusammenarbeit?

            <span className="flex size-8 items-center justify-center border border-primary/30 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
              <FiArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>
    </section>
  </main>
);

export default DashboardPage;
