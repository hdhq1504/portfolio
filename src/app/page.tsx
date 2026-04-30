import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GradientTransition from "@/components/GradientTransition";

export default function Home() {
  return (
    <>
      <div className="relative">
        <HeroSection />
        <GradientTransition direction="bottom" />
      </div>
      <div className="relative">
        <GradientTransition direction="top" />
        <ProjectsSection />
      </div>
      <SkillsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
