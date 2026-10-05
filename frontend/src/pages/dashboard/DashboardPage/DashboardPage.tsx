import { motion } from "motion/react";
import {
  FiArrowUpRight,
  FiCode,
  FiLayers,
  FiTerminal,
} from "react-icons/fi";

import eventsImage from "../../../features/assets/events.png";
import todoImage from "../../../features/assets/todo.png";
import game2048Image from "../../../features/assets/2048.png";

const projects = [
  {
    number: "01",
    title: "Events",
    category: "Full Stack · Planning",
    description:
      "Eine moderne Kalenderanwendung zur Planung des Tages, Verwaltung von Terminen und übersichtlichen Organisation komplexer Zeitpläne.",
    technologies: ["React", "TypeScript", "Zustand", "Express", "MongoDB"],
    href: "/dashboard/events",
    icon: FiLayers,
    image: eventsImage,
    featured: true,
    tone: "from-orange-100 via-amber-50 to-white",
  },
  {
    number: "02",
    title: "To Do",
    category: "Full Stack · Productivity",
    description:
      "Eine produktive Aufgabenverwaltung mit Suche, Filtern, Sortierung, Pagination und einer übersichtlichen Fortschrittsanalyse.",
    technologies: ["React", "TypeScript", "Zustand", "Recharts"],
    href: "/dashboard/todo",
    icon: FiTerminal,
    image: todoImage,
    featured: false,
    tone: "from-sky-100 via-cyan-50 to-white",
  },
  {
    number: "03",
    title: "2048",
    category: "Frontend · Game",
    description:
      "Eine responsive Umsetzung des klassischen 2048-Spiels mit eigener Spiellogik sowie Unterstützung für Tastatur- und Touch-Steuerung.",
    technologies: ["React", "TypeScript", "Game Logic"],
    href: "/dashboard/2048",
    icon: FiCode,
    image: game2048Image,
    featured: false,
    tone: "from-violet-100 via-fuchsia-50 to-white",
  },
];

const DashboardPage = () => (
  <main className="min-h-full text-text">
    <header className="border-b border-border pb-8 pt-2 sm:pb-10">
      <a
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-xs font-semibold text-text-muted transition-colors hover:text-primary"
      >
        ← Zur persönlichen Seite
      </a>

      <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            01 / Ausgewählte Arbeit
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Projekte, die zeigen,
            <br />
            <span className="text-primary">was ich bauen kann.</span>
          </h1>
        </div>

        <div>
          <p className="text-sm leading-6 text-text-secondary sm:text-base">
            Hier finden Sie eine Auswahl meiner praktischen Arbeiten. Von
            Full-Stack-Anwendungen bis zu interaktiven Frontend-Projekten
            entwickle ich Lösungen mit Fokus auf sauberen Code, durchdachte
            Benutzeroberflächen und eine zuverlässige technische Umsetzung.
          </p>

          <p className="mt-4 text-sm font-medium text-text">
            Jedes Projekt ist dabei eine Gelegenheit, neue Technologien
            praktisch einzusetzen und meine Fähigkeiten weiterzuentwickeln.
          </p>
        </div>
      </div>
    </header>

    <section
      aria-label="Ausgewählte Projekte"
      className="grid gap-5 py-8 sm:py-10 md:grid-cols-2"
    >
      {projects.map((project, index) => {
        const Icon = project.icon;

        return (
          <motion.article
            key={project.number}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.35,
              delay: index * 0.07,
            }}
            className={`group overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg ${
              project.featured
                ? "md:col-span-2 md:grid md:grid-cols-[1fr_1fr]"
                : ""
            }`}
          >
            {/* Preview */}
            <div
              className={`relative min-h-56 overflow-hidden bg-gradient-to-br sm:min-h-64 ${
                project.tone
              }`}
            >
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                className="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-slate-950/10 transition group-hover:bg-slate-950/5" />

              {/* Number */}
              <span className="absolute left-6 top-6 rounded-full bg-white/85 px-3 py-1 text-[10px] font-bold tracking-widest text-text-muted backdrop-blur-sm">
                {project.number}
              </span>

              {/* Category */}
              <span className="absolute right-6 top-6 rounded-full bg-white/85 px-3 py-1 text-[10px] font-semibold text-text-secondary backdrop-blur-sm">
                {project.category}
              </span>

              {/* Project icon */}
              <div className="absolute bottom-6 left-6 flex size-14 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-primary shadow-lg backdrop-blur-md transition duration-300 group-hover:scale-105">
                <Icon className="size-6" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col items-start p-6 sm:p-8">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {project.title}
              </h2>

              <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-lg bg-gray-light px-2.5 py-1.5 text-[11px] font-medium text-text-secondary"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <a
                href={project.href}
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-text transition-colors group-hover:text-primary"
              >
                {project.title === "2048"
                  ? "Spiel starten"
                  : "Projekt ansehen"}

                <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.article>
        );
      })}
    </section>

    {/* Closing message */}
    <section className="border-t border-border py-10 sm:py-12">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          02 / Arbeitsweise
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
          Ich möchte nicht nur Code schreiben, sondern gute Produkte bauen.
        </h2>

        <p className="mt-4 text-sm leading-6 text-text-secondary sm:text-base">
          Mein Ziel ist es, mich als Frontend- und React-Entwickler
          kontinuierlich weiterzuentwickeln, Verantwortung zu übernehmen und
          gemeinsam mit einem guten Team digitale Produkte zu entwickeln, die
          technisch sauber und für Menschen angenehm zu benutzen sind.
        </p>

        <a
          href="/#kontakt"
          className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          Interesse an einer Zusammenarbeit?
          <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </section>
  </main>
);

export default DashboardPage;