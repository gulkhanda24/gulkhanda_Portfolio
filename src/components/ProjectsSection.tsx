import { motion, useScroll, useTransform } from "framer-motion";
import { Lock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Link } from "react-router-dom";
import { useRef } from "react";
import SplitText from "./SplitText";

const projects = [
  {
    title: "Personalised AI: cut redundant tasks & boost productivity",
    company: "Enterprise B2B SaaS",
    companyShort: "AI",
    companyColor: "#7c3aed",
    slug: "personalised-ai-productivity",
    tags: ["GenAI", "UX Research", "Productivity", "Enterprise UX"],
    mockupBg: "#1e1b4b",
    phoneImage: "https://framerusercontent.com/images/gTuVAcE246SnhVwH9sB7s9DEsXk.png?width=679&height=1443",
    fallbackImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
  },
  {
    title: "Redesigning the Future of E-Commerce",
    company: "Amazon Bazaar",
    companyShort: "Amazon",
    companyColor: "#e47911",
    slug: "amazon-bazaar",
    tags: ["Mobile", "User Experience Design", "User Interface Design"],
    mockupBg: "#131921",
    phoneImage: "https://framerusercontent.com/images/1rhFSirz5rTwCKsi1ornqrMo8.png?width=679&height=1443",
    fallbackImage: "https://framerusercontent.com/images/pG0UmSlGHvpWG2nB453EgW8fVY.gif?width=3840&height=2160",
  },
  {
    title: "Reimagining Banking — Design System",
    company: "Qatar National Bank",
    companyShort: "QNB",
    companyColor: "#0060a8",
    slug: "qnb-design-system",
    tags: ["Web", "Design System", "Atoms", "Tokens", "Organisms"],
    mockupBg: "#0d1f3c",
    phoneImage: null,
    fallbackImage: "https://framerusercontent.com/images/6XqIkd0Pmn5Mo9HM6I6Ww5cjIQ.png?width=1108&height=332",
  },
];

/* ─── Section header ──────────────────────────────────────────────────── */
const ProjectsSection = () => {
  const { ref: headerRef, isInView: headerInView } = useScrollAnimation();

  return (
    <section id="projects" className="py-28 px-6 bg-transparent overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <div ref={headerRef}>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.22em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Recent Work
          </motion.p>

          <h2 className="font-heading font-heading-display font-bold text-3xl md:text-4xl text-white mb-4 max-w-xl leading-[1.05] tracking-heading-tight">
            <SplitText
              text="Selection of experienced product design solutions"
              delay={0.05}
              stagger={0.06}
              margin="-30px"
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ color: "rgba(255,255,255,0.75)" }}
            className="max-w-2xl"
          >
            Innovative digital concepts crafted with precision and purpose.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 mt-14">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── Project card ────────────────────────────────────────────────────── */
const ProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const { ref, isInView } = useScrollAnimation({ margin: "-60px" });
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -25]);

  return (
    <Link to={`/case-study/${project.slug}`}>
      <motion.div
        ref={(el) => {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        }}
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -6, transition: { duration: 0.28 } }}
        className="group relative rounded-3xl bg-white overflow-hidden cursor-pointer"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.10)" }}
      >
        <div className="flex flex-col md:flex-row min-h-[300px]">

          {/* ── Left: content ── */}
          <div className="flex-1 flex flex-col justify-center px-10 py-12 md:py-14">

            {/* Company badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15 + index * 0.1 }}
              className="flex items-center gap-3 mb-7"
            >
              {/* Logo mark */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-base font-black select-none flex-shrink-0 shadow-sm"
                style={{ background: `linear-gradient(135deg, ${project.companyColor}, ${project.companyColor}cc)` }}
              >
                ✦
              </div>
              {/* Company short name — large bold */}
              <span
                className="font-heading font-black text-2xl md:text-3xl tracking-tight leading-none"
                style={{ color: project.companyColor }}
              >
                {project.companyShort}
              </span>
              {/* Full name — muted */}
              <span className="text-sm font-medium text-gray-400">
                ({project.company})
              </span>
            </motion.div>

            {/* Title — large display editorial style */}
            <h3
              className="font-heading font-black text-gray-900 mb-7 leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)" }}
            >
              <SplitText
                text={project.title}
                delay={0.2 + index * 0.1}
                stagger={0.04}
                margin="-20px"
              />
            </h3>

            {/* Tags — styled pills with bullet separator */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="flex flex-wrap items-center gap-x-2 gap-y-2"
            >
              {project.tags.map((tag, i) => (
                <span key={tag} className="flex items-center gap-x-2">
                  <span
                    className="text-base font-semibold tracking-wide"
                    style={{ color: "#374151" }}
                  >
                    {tag}
                  </span>
                  {i < project.tags.length - 1 && (
                    <span
                      className="text-lg font-black select-none"
                      style={{ color: project.companyColor, opacity: 0.7 }}
                    >
                      ◆
                    </span>
                  )}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: mockup panel wrapper (padding creates the gap) ── */}
          <div className="md:w-[44%] flex-shrink-0 flex items-center justify-center p-5">
          <div
            className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-3xl"
            style={{ background: project.mockupBg, minHeight: "280px" }}
          >
            {/* Dot-grid texture */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            {/* Radial glow behind phone */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 70% 60% at 60% 60%, rgba(100,140,255,0.18) 0%, transparent 70%)",
              }}
            />

            {/* Edge vignette for depth */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(0,0,0,0.35) 100%)",
              }}
            />

            {/* Lock icon */}
            <div className="absolute top-5 left-5 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg z-20">
              <Lock className="w-4 h-4 text-gray-700" strokeWidth={2.5} />
            </div>

            {project.phoneImage ? (
              <motion.img
                src={project.phoneImage}
                alt={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.95, delay: 0.3 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ y: phoneY }}
                className="w-[185px] md:w-[220px] rounded-2xl shadow-[0_24px_64px_rgba(0,0,0,0.55)] relative z-10 mt-8"
              />
            ) : (
              <img
                src={project.fallbackImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
              />
            )}
          </div>
          </div>

        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectsSection;
