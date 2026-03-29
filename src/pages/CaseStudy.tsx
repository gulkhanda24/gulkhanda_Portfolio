import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { getCaseStudy, CaseStudySection } from "@/data/caseStudies";
import { useEffect, useState, useRef, useCallback } from "react";

// Page transition wrapper
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const sectionFade = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerChildren = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const childFade = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// Blue wavy scribble SVG for active sidebar item
const WavyScribble = () => (
  <motion.svg
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: 1, opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    width="80"
    height="12"
    viewBox="0 0 80 12"
    fill="none"
    className="mt-1"
  >
    <motion.path
      d="M2 8C10 2 18 12 26 6C34 0 42 12 50 6C58 0 66 12 74 6"
      stroke="hsl(217, 91%, 60%)"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  </motion.svg>
);

const CaseStudyPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = getCaseStudy(slug || "");
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax for hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.6], [1, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    if (!study) return;
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(index);
          }
        },
        { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [study, slug]);

  const scrollToSection = useCallback((index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  if (!study) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-4">
            Case Study Not Found
          </h1>
          <Link to="/" className="text-primary hover:underline inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={slug}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-background"
      >
        {/* Navbar */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link to="/" className="font-heading font-bold text-xl text-foreground">
              Hiloni Shah
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/#projects"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Work
              </Link>
              <Link
                to="/#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
              <a
                href="mailto:hilonishah8@gmail.com"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Contact
              </a>
            </div>
          </div>
        </motion.nav>

        {/* Hero Section with parallax */}
        <div ref={heroRef} className="relative overflow-hidden">
          <motion.div style={{ y: heroY, opacity: heroOpacity }}>
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-7xl mx-auto px-6 pt-10 pb-6"
            >
              <Link
                to="/#projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors tracking-wide uppercase"
              >
                <ArrowLeft size={16} />
                Back to All Projects
              </Link>
            </motion.div>

            {/* Header */}
            <motion.div
              variants={staggerChildren}
              initial="hidden"
              animate="visible"
              className="max-w-7xl mx-auto px-6 pb-10"
            >
              <motion.p
                variants={childFade}
                className="text-lg md:text-xl text-primary mb-3"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                {study.categoryLabel}
              </motion.p>

              <motion.h1
                variants={childFade}
                className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-8 max-w-4xl"
              >
                {study.title}
              </motion.h1>

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <motion.p
                  variants={childFade}
                  className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl"
                >
                  {study.description}
                </motion.p>

                <motion.div variants={childFade} className="flex gap-8 md:gap-12 flex-shrink-0">
                  {[
                    { label: "Client", value: study.client },
                    { label: "My Role", value: study.role },
                    { label: "Year", value: study.year, highlight: true },
                  ].map((item) => (
                    <div key={item.label}>
                      <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase mb-1">
                        {item.label}
                      </p>
                      <p
                        className={`text-sm font-semibold uppercase ${
                          item.highlight ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="max-w-7xl mx-auto px-6"
            >
              <div className="h-px bg-border origin-left" />
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl mx-auto px-6 py-12"
            >
              <div className="rounded-2xl overflow-hidden bg-muted shadow-2xl shadow-primary/5">
                <img
                  src={study.heroImage}
                  alt={study.title}
                  className="w-full object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Main content with sidebar */}
        <div className="max-w-7xl mx-auto px-6" ref={contentRef}>
          <div className="flex gap-16 relative">
            {/* Sticky Sidebar TOC */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-28">
                <motion.nav
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="flex flex-col gap-8 py-8"
                >
                  {study.sections.map((section, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToSection(i)}
                      className={`text-left transition-all duration-300 group ${
                        activeSection === i ? "opacity-100" : "opacity-50 hover:opacity-75"
                      }`}
                    >
                      <h4
                        className={`font-heading font-bold text-lg transition-colors duration-300 ${
                          activeSection === i ? "text-foreground" : "text-foreground"
                        }`}
                      >
                        {section.title}
                      </h4>
                      {activeSection === i && <WavyScribble />}
                      <p className="text-sm text-muted-foreground mt-1 leading-snug">
                        {section.subtitle}
                      </p>
                    </button>
                  ))}
                </motion.nav>
              </div>
            </aside>

            {/* Content sections */}
            <div className="flex-1 min-w-0 pb-20">
              {study.sections.map((section, i) => (
                <SectionBlock
                  key={i}
                  section={section}
                  index={i}
                  ref={(el) => {
                    sectionRefs.current[i] = el;
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Next Case Study */}
        {study.nextSlug && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="border-t border-border bg-muted/30"
          >
            <div className="max-w-7xl mx-auto px-6 py-20">
              <Link
                to={`/case-study/${study.nextSlug}`}
                className="group flex items-center justify-between"
              >
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-sm text-muted-foreground mb-2 uppercase tracking-widest">
                    Next Case Study
                  </p>
                  <h3 className="font-heading font-bold text-3xl md:text-5xl text-foreground group-hover:text-primary transition-colors duration-300">
                    {study.nextTitle}
                  </h3>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <ArrowRight
                    size={48}
                    className="text-muted-foreground group-hover:text-primary group-hover:translate-x-3 transition-all duration-300"
                  />
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <footer className="border-t border-border py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Hiloni Shah. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="mailto:hilonishah8@gmail.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Email</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Dribbble</a>
            </div>
          </div>
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};

// Individual section component with ref forwarding
import { forwardRef } from "react";

const SectionBlock = forwardRef<
  HTMLElement,
  { section: CaseStudySection; index: number }
>(({ section, index }, ref) => {
  return (
    <motion.section
      ref={ref}
      id={`section-${index}`}
      variants={sectionFade}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-24 scroll-mt-28"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">
          {section.title}
        </h3>
        <p
          className="text-lg text-muted-foreground"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {section.subtitle}
        </p>
      </motion.div>

      {/* Content paragraphs */}
      {section.content.map((paragraph, pi) => (
        <motion.p
          key={pi}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: pi * 0.1 }}
          className="text-muted-foreground text-base md:text-lg leading-relaxed mb-5"
        >
          {paragraph}
        </motion.p>
      ))}

      {/* Bullet points */}
      {section.bullets && (
        <motion.ul
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-3 mb-6 pl-1"
        >
          {section.bullets.map((bullet, bi) => (
            <motion.li
              key={bi}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + bi * 0.08 }}
              className="flex items-start gap-3 text-muted-foreground text-base leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
              {bullet}
            </motion.li>
          ))}
        </motion.ul>
      )}

      {/* Section image */}
      {section.image && (
        <motion.figure
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-10 rounded-2xl overflow-hidden bg-muted shadow-xl shadow-primary/5"
        >
          <img
            src={section.image}
            alt={section.imageCaption || section.title}
            className="w-full object-cover"
          />
          {section.imageCaption && (
            <figcaption className="text-center text-sm text-muted-foreground py-4 border-t border-border/50">
              {section.imageCaption}
            </figcaption>
          )}
        </motion.figure>
      )}
    </motion.section>
  );
});

SectionBlock.displayName = "SectionBlock";

export default CaseStudyPage;
