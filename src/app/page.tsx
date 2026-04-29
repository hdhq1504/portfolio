import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </>
  );
}
