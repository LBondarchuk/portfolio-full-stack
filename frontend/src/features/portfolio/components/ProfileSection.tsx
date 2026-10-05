import { motion } from "motion/react";
import { FiBriefcase } from "react-icons/fi";
// import useReveal from "../hooks/useReveal";

const ProfileSection = () => {
  // const reveal = useReveal();

  return <motion.section
    id="profil"
    // {...reveal}
    className="scroll-mt-10 border-t border-border py-16 sm:py-20"
  >
    <div className="grid gap-10 md:grid-cols-[0.75fr_1.25fr]">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">01 / Profil</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Mit Neugier lernen.<br />Mit Sorgfalt entwickeln.
        </h2>
      </div>
      <div className="space-y-5 text-base leading-7 text-text-secondary">
        <p>
          Ich suche aktuell eine Position als <strong className="font-medium text-text">Frontend-Entwickler mit Schwerpunkt React</strong>. In den letzten Jahren habe ich eigenständig Webanwendungen entwickelt und praktische Erfahrung mit React, TypeScript, State-Management, API-Integration und responsivem Design gesammelt.
        </p>
        <p>
          Besonders interessieren mich gut strukturierte Anwendungen und Benutzeroberflächen, die Menschen im Alltag wirklich helfen. Ich spreche Deutsch auf B2-Niveau und möchte meine Erfahrung in einem professionellen Entwicklungsteam einbringen und weiter ausbauen.
        </p>
        <p className="flex items-center gap-2 text-sm text-text-muted">
          <FiBriefcase className="shrink-0 text-primary" />
          Von operativer Verantwortung zur Softwareentwicklung — mit analytischem Blick und Freude am Problemlösen.
        </p>
      </div>
    </div>
  </motion.section>;
};

export default ProfileSection;
