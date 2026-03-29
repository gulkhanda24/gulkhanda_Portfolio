import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeText from "@/components/Marquee";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.hash) {
        const el = document.querySelector(target.hash);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Global scroll helpers */}
      <ScrollProgress />
      <ScrollToTop />

      <Navbar />
      {/* Hero → Recent Work → About share one continuous pink gradient */}
      <div className="hero-gradient">
        <HeroSection />
        <MarqueeText />
        <ProjectsSection />
        <AboutSection />
      </div>
      <ServicesSection />
      <ExperienceSection />
      <Footer />
    </div>
  );
};

export default Index;
