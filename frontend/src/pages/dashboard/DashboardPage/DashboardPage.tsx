import { motion } from "motion/react";
import {
  FiArrowUpRight,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiTerminal,
} from "react-icons/fi";

type Project = {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  href: string;
  label: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    number: "01",
    title: "Events",
    description:
      "A modern event management workspace with calendar scheduling, timelines and interactive event details.",
    technologies: ["React", "TypeScript", "Zustand", "Node.js"],
    image: "/projects/events.png",
    href: "/dashboard/events",
    label: "Open project",
    featured: true,
  },
  {
    number: "02",
    title: "To Do",
    description:
      "A productivity workspace for managing tasks, tracking progress and exploring personal analytics.",
    technologies: ["React", "TypeScript", "Charts", "Zustand"],
    image: "/projects/todo.png",
    href: "/dashboard/todo",
    label: "Open project",
  },
  {
    number: "03",
    title: "2048",
    description:
      "A polished implementation of the classic 2048 game with a custom interactive interface.",
    technologies: ["React", "TypeScript"],
    image: "/projects/2048.png",
    href: "/dashboard/2048",
    label: "Play game",
  },
];

const technologies = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Zustand",
  "Framer Motion",
  "Node.js",
  "Express",
  "MongoDB",
];

const DashboardPage = () => {
  return (
    <div className="min-h-full bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-10">


        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface">

          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-primary-light blur-3xl" />

          <div className="relative grid gap-10 p-6 md:p-10 lg:grid-cols-[1fr_300px] lg:p-14">

            {/* Intro */}
            <div className="flex flex-col justify-center">

              <div className="mb-6 flex items-center gap-2">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-50" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-success" />
                </span>

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                  Developer workspace
                </span>
              </div>

              <p className="text-sm font-semibold text-primary">
                Frontend Developer
              </p>

              <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-[-0.04em] text-text md:text-6xl">
                I build digital
                <br />
                experiences that
                <br />
                <span className="text-primary">feel alive.</span>
              </h1>

              <p className="mt-6 max-w-xl text-sm leading-6 text-text-secondary md:text-base">
                I'm a developer focused on creating clean, interactive and
                thoughtfully engineered web applications with modern
                frontend technologies.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="
                    flex items-center gap-2
                    rounded-lg
                    bg-primary
                    px-4 py-2.5
                    text-sm font-medium
                    text-white
                    shadow-sm
                    transition-all
                    hover:bg-primary-hover
                    hover:shadow-md
                  "
                >
                  Explore my work
                  <FiArrowUpRight className="size-4" />
                </a>

                <a
                  href="#about"
                  className="
                    flex items-center gap-2
                    rounded-lg
                    border border-border
                    bg-surface
                    px-4 py-2.5
                    text-sm font-medium
                    text-text
                    transition-all
                    hover:border-primary/30
                    hover:bg-primary-light
                    hover:text-primary
                  "
                >
                  About me
                </a>
              </div>
            </div>

            {/* Developer card */}
            <div className="flex items-end">
              <div className="w-full rounded-2xl border border-border bg-background p-5">

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    Currently building
                  </span>

                  <FiTerminal className="size-4 text-text-muted" />
                </div>

                <div className="mt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-primary-light">
                      <FiCode className="size-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-text">
                        Personal Planner
                      </p>

                      <p className="text-[10px] text-text-muted">
                        React · TypeScript
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between">
                      <span className="text-[10px] text-text-muted">
                        Development
                      </span>

                      <span className="text-[10px] font-semibold text-primary">
                        78%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-gray-light">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "78%" }}
                        transition={{ duration: 1 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <Stat value="03" label="Projects" />
                  <Stat value="08+" label="Technologies" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────── PROJECTS ───────────────── */}

        <section id="projects" className="mt-20">

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>
              <div className="flex items-center gap-2">
                <FiLayers className="size-4 text-primary" />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Selected work
                </span>
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight text-text md:text-3xl">
                Things I've built.
              </h2>
            </div>

            <p className="max-w-sm text-sm leading-5 text-text-secondary">
              A collection of projects where I experiment with interfaces,
              architecture and interaction.
            </p>
          </div>

          <div className="mt-8 space-y-5">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* ───────────────── ABOUT ───────────────── */}

        <section
          id="about"
          className="
            mt-20
            grid
            gap-5
            md:grid-cols-[1fr_1fr]
          "
        >

          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary-light">
              <FiCode className="size-4 text-primary" />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-text">
              How I build
            </h3>

            <p className="mt-2 text-sm leading-6 text-text-secondary">
              I care about more than making things work. I like building
              interfaces that are predictable, responsive and enjoyable to
              use.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "Component architecture",
                "State management",
                "Responsive UI",
                "Animations",
                "API integration",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    rounded-lg
                    border border-border
                    bg-gray-light
                    px-2.5 py-1.5
                    text-[10px]
                    font-medium
                    text-text-secondary
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 md:p-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
              Technologies
            </span>

            <div className="mt-5 flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <span
                  key={technology}
                  className="
                    rounded-lg
                    border border-border
                    bg-background
                    px-3 py-2
                    text-xs font-medium
                    text-text
                    transition-colors
                    hover:border-primary/30
                    hover:bg-primary-light
                    hover:text-primary
                  "
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 flex flex-col gap-3 border-t border-border py-8 text-xs text-text-muted md:flex-row md:items-center md:justify-between">
          <span>Designed & built with React.</span>

          <a
            href="#"
            className="flex items-center gap-1.5 transition-colors hover:text-primary"
          >
            <FiGithub className="size-3.5" />
            GitHub
            <FiExternalLink className="size-3" />
          </a>
        </footer>
      </div>
    </div>
  );
};

/* ───────────────── PROJECT CARD ───────────────── */

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
      }}
      className={`
        group
        overflow-hidden
        rounded-2xl
        border border-border
        bg-surface
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-primary/30
        hover:shadow-xl
        ${
          project.featured
            ? "grid lg:grid-cols-[1.25fr_0.75fr]"
            : "grid lg:grid-cols-[0.75fr_1.25fr]"
        }
      `}
    >
      {/* Image */}
      <div
        className={`
          relative
          min-h-[240px]
          overflow-hidden
          bg-gray-light
          ${project.featured ? "lg:order-1" : "lg:order-2"}
        `}
      >
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-top
            transition-transform
            duration-700
            group-hover:scale-[1.025]
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <span
          className="
            absolute
            left-4
            top-4
            rounded-md
            bg-surface/90
            px-2
            py-1
            text-[9px]
            font-bold
            tracking-wider
            text-text
            shadow-sm
            backdrop-blur
          "
        >
          {project.number}
        </span>
      </div>

      {/* Content */}
      <div
        className={`
          flex
          flex-col
          justify-center
          p-6
          md:p-8
          ${project.featured ? "lg:order-2" : "lg:order-1"}
        `}
      >
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">
            {project.title}
          </span>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-text">
          {project.featured
            ? "A workspace built around your time."
            : project.title === "To Do"
              ? "Productivity, without the noise."
              : "A familiar game, rebuilt."}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-6 text-text-secondary">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="
                rounded-md
                bg-gray-light
                px-2
                py-1
                text-[9px]
                font-medium
                text-text-muted
              "
            >
              {technology}
            </span>
          ))}
        </div>

        <a
          href={project.href}
          className="
            mt-7
            flex
            w-fit
            items-center
            gap-2
            text-xs
            font-semibold
            text-text
            transition-colors
            group-hover:text-primary
          "
        >
          {project.label}
          <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.article>
  );
};

/* ───────────────── STAT ───────────────── */

const Stat = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <p className="text-lg font-bold tracking-tight text-text">{value}</p>
      <p className="mt-0.5 text-[9px] uppercase tracking-wider text-text-muted">
        {label}
      </p>
    </div>
  );
};

export default DashboardPage;