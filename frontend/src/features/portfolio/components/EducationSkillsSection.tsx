import { motion } from "motion/react";
import { skills } from "../data/portfolio.data";
// import useReveal from "../hooks/useReveal";

const EducationSkillsSection = () => {
  // const reveal = useReveal();

  return <motion.section
    // {...reveal}
    className="grid gap-6 border-t border-border py-16 sm:py-20 md:grid-cols-2"
  >
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">03 / Bildungsweg</p>
      <h2 className="mt-4 text-2xl font-semibold">Fundament & Weiterbildung</h2>
      <div className="mt-7 border-l border-primary/40 pl-5">
        <p className="font-semibold">Junior Specialist in Computer Technology</p>
        <p className="mt-1 text-sm leading-6 text-text-secondary">Vinnytsia College der Nationalen Universität für Lebensmitteltechnologien · Ukraine</p>
        <p className="mt-2 text-xs text-text-muted">2009 — 2013</p>
      </div>
      <div className="mt-6 border-l border-border pl-5">
        <p className="font-semibold">Frontend-Weiterbildung</p>
        <p className="mt-1 text-sm leading-6 text-text-secondary">Mate Academy: Git, HTML, CSS, JavaScript, TypeScript und React. Ergänzend selbstständiges Lernen mit React-Dokumentation, MDN und Fachbüchern.</p>
      </div>
    </div>
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">04 / Fähigkeiten</p>
      <h2 className="mt-4 text-2xl font-semibold">Werkzeuge, mit denen ich arbeite.</h2>
      <div className="mt-6 divide-y divide-border">
        {skills.map((skill) => (
          <div key={skill.title} className="grid gap-1 py-3 sm:grid-cols-[125px_1fr]">
            <p className="text-xs font-semibold text-text-muted">{skill.title}</p>
            <p className="text-sm leading-6 text-text-secondary">{skill.items}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">Sprachen</p>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-gray-light px-3 py-1.5 text-xs">Ukrainisch · Muttersprache</span>
          <span className="rounded-full bg-gray-light px-3 py-1.5 text-xs">Deutsch · B2</span>
          <span className="rounded-full bg-gray-light px-3 py-1.5 text-xs">Englisch · B1/B2</span>
        </div>
      </div>
    </div>
  </motion.section>;
};

export default EducationSkillsSection;
