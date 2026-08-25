import { memo } from "react";
import HeroSection from "../sections/HeroSection";
import AboutSection from "../sections/AboutSection";
import PortfolioSection from "../sections/PortfolioSection";
import SkillsSection from "../sections/SkillsSection";
import TestimonialsSection from "../sections/TestimonialsSection";
import ContactSection from "../sections/ContactSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

export default memo(HomePage);
