import ContactSection from "../features/portfolio/components/ContactSection";
import EducationSkillsSection from "../features/portfolio/components/EducationSkillsSection";
import ExperienceSection from "../features/portfolio/components/ExperienceSection";
import PortfolioFooter from "../features/portfolio/components/PortfolioFooter";
import PortfolioHeader from "../features/portfolio/components/PortfolioHeader";
import PortfolioHero from "../features/portfolio/components/PortfolioHero";
import ProfileSection from "../features/portfolio/components/ProfileSection";

const HomePage = () => (
  <main className="min-h-screen scroll-smooth overflow-hidden bg-background text-text selection:bg-primary-light selection:text-text">
    <div className="pointer-events-none fixed inset-0 opacity-[0.06] bg-[radial-gradient(#64748b_0.55px,transparent_0.55px)] [background-size:20px_20px]" />

    <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
      <PortfolioHeader />
      <PortfolioHero />
      <ProfileSection />
      <ExperienceSection />
      <EducationSkillsSection />
      <ContactSection />
      <PortfolioFooter />
    </div>
  </main>
);

export default HomePage;
