import { motion } from "motion/react";
import { experiences } from "../data/portfolio.data";
import useReveal from "../hooks/useReveal";

const ExperienceSection = () => (
  <ExperienceSectionContent />
);

const ExperienceSectionContent = () => {
  const reveal = useReveal();

  return <section
    id="erfahrung"
    className="scroll-mt-10 border-t border-border py-16 sm:py-20"
  >
    <div className="mb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">02 / Beruflicher Weg</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Erfahrung, die mich geprägt hat.</h2>
    </div>
    <div>
      {experiences.map((experience, index) => (
        <motion.article
          key={experience.role}
          {...reveal}
          transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
          className="grid gap-3 border-t border-border py-7 sm:grid-cols-[190px_1fr] sm:gap-8"
        >
          <p className="pt-1 text-sm font-medium text-primary">{experience.period}</p>
          <div>
            <h3 className="text-xl font-semibold">{experience.role}</h3>
            <p className="mt-1 text-sm text-text-muted">{experience.place}</p>
            <ul className="mt-4 space-y-2">
              {experience.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-text-secondary">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </div>
  </section>;
};

export default ExperienceSection;
