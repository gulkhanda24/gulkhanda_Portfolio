import { useEffect } from "react";
import { motion } from "framer-motion";
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
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
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
    </motion.div>
  );
};

export default Index;
