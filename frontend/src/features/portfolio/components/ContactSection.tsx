import { motion } from "motion/react";
import {
  FiArrowUpRight,
  FiGithub,
  FiLinkedin,
  FiMessageCircle,
} from "react-icons/fi";
// import useReveal from "../hooks/useReveal";

const ContactSection = () => {
  // const reveal = useReveal();

  return (
    <motion.section
      id="kontakt"
      // {...reveal}
      className="scroll-mt-10 mb-10 overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary-light to-surface p-7 sm:mb-16 sm:p-10 lg:p-12"
    >
      <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            05 / Kontakt
          </p>

          <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Lassen Sie uns ins Gespräch kommen.
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-text-secondary">
            Ich freue mich über Jobangebote und Gespräche zu Positionen im
            Frontend- und React-Bereich.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {/* GitHub */}
            <a
              href="https://github.com/LBondarchuk"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-primary hover:text-primary"
            >
              <FiGithub className="size-4" />
              GitHub
              <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/leonid-bondarchuk-571519284/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-[#0A66C2] hover:text-[#0A66C2]"
            >
              <FiLinkedin className="size-4" />
              LinkedIn
              <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Email */}
          <a
            className="group inline-flex items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition-all duration-200 hover:bg-primary-hover"
            href="mailto:leonid.bondarchuk.dev@gmail.com"
          >
            <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            E-Mail schreiben
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/4917684722520"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 text-sm font-semibold text-text-secondary transition-all duration-200 hover:border-[#25D366] hover:text-[#25D366]"
          >
            <FiMessageCircle className="size-4" />
            WhatsApp · +49 176 84722520
            <FiArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactSection;
