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
          Vom Analysieren zum Entwickeln.<br />Mit Blick fürs Ganze.
        </h2>
      </div>
      <div className="space-y-5 text-base leading-7 text-text-secondary">
        <p>
          Seit 2022 beschäftige ich mich intensiv mit Webentwicklung: Nach gezielter Weiterbildung habe ich eigene Pet-Projekte umgesetzt und ein Jahr kommerzielle Erfahrung als Entwickler gesammelt. Mein Schwerpunkt liegt auf <strong className="font-medium text-text">Frontend-Entwicklung mit React und TypeScript</strong>.
        </p>
        <p>
          In eigenen Projekten habe ich mit Node.js, Express, MongoDB, Firebase und WebSockets gearbeitet. Die Grundlagen von Backend-Entwicklung und Tests kenne ich, habe in diesem Bereich aber noch keine umfangreiche Praxiserfahrung.
        </p>
        <p>
          Vor knapp zwei Jahren bin ich mit meiner Familie nach Deutschland gezogen. Hier habe ich mich eingelebt und Deutsch bis zum Niveau B2 gelernt. Jetzt suche ich eine <strong className="font-medium text-text">Frontend-Position</strong>, in der ich meine Praxiserfahrung und mein Backend-Verständnis in ein Team einbringen kann.
        </p>
        <p className="flex items-center gap-2 text-sm text-text-muted">
          <FiBriefcase className="shrink-0 text-primary" />
          Analytischer Blick, Verantwortungsbewusstsein und Freude daran, Probleme in klare Lösungen zu verwandeln.
        </p>
      </div>
    </div>
  </motion.section>;
};

export default ProfileSection;
